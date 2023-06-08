import Node from "./engine/node/Node"
import ComponentType from "./engine/component/ComponentType"
import Sprite from "./engine/types/Sprite"
import Renderer from "./engine/component/Renderer"
import Transform from "./engine/component/Transform"
import Vector from "./engine/types/Vector"
import Input from "./engine/system/Input"
import Time from "./engine/system/Time"
import RectangleCollider from "./engine/component/RectangleCollider"
import Collider from "./engine/component/Collider"
import {GameEvent, ParamGameEvent} from "./engine/types/Event"
import BirdGame from "./BirdGame"
import GameState from "./GameState"
import TrailDot from "./TrailDot"

class Bird extends Node
{
    public touchedLeftWall: GameEvent
    public touchedRightWall: GameEvent
    public scoreChanged: ParamGameEvent<number>

    public transform: Transform
    public collider: RectangleCollider
    public renderer: Renderer

    private isLocked = true
    private isAlive = true
    private lastJumpTime = 0
    private lastJumpPosY: number
    private isMovingRight = true
    private moveSpeed = 200
    private jumpCurveXCoeff = 2.7
    private jumpCurveYCoeff = 100
    private jumpSprite: Sprite
    private glideSprite: Sprite

    private jumpSpriteTimeout = 0.4
    private jumpSpriteTimer = 0.4
    private trailDotSpawnTimeout = 0.1
    private trailDotSpawnTimer = 0.1

    public init(): void {
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.transform.position = new Vector(50, 100)
        this.lastJumpTime = Time.timeSinceGameStart()
        this.lastJumpPosY = this.transform.position.y

        this.collider = this.addComponent(ComponentType.RECTANGLE_COLLIDER) as RectangleCollider
        this.collider.size = new Vector(15, 15)
        this.collider.collisionStarted.subscribe(this.handleCollisionStart.bind(this))

        const sprite = new Sprite("./assets/kenney/Characters/character_0000.png")
        this.renderer = this.addComponent(ComponentType.RENDERER) as Renderer
        this.renderer.setDrawable(sprite)
        this.renderer.drawOrder = 5

        this.touchedLeftWall = new GameEvent()
        this.touchedRightWall = new GameEvent()
        this.touchedLeftWall.subscribe(this.turnRight.bind(this))
        this.touchedRightWall.subscribe(this.turnLeft.bind(this))
        this.touchedLeftWall.subscribe(this.wallTouchedHandler.bind(this))
        this.touchedRightWall.subscribe(this.wallTouchedHandler.bind(this))
        this.touchedLeftWall.subscribe(() => this.scoreChanged.invoke(BirdGame.currentScore))
        this.touchedRightWall.subscribe(() => this.scoreChanged.invoke(BirdGame.currentScore))

        this.jumpSprite = new Sprite("assets/Jump.png")
        this.jumpSprite.scale = Vector.one().multiply(0.1)
        this.glideSprite = new Sprite("assets/Glide.png")
        this.glideSprite.scale = Vector.one().multiply(0.1)

        this.scoreChanged = new ParamGameEvent<number>()

        this.turnRight()

        BirdGame.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))
    }

    public update(): void {
        if (this.isLocked)
        {
            this.playIdleAnimation()
            return
        }

        this.move()
        if (Input.getKeyDown(' ') || Input.getMouseDown()) this.jump()

        const elapsedJumpTime = Time.timeSinceGameStart() - this.lastJumpTime
        this.transform.position.y = this.jumpYFunction(elapsedJumpTime)

        this.jumpSpriteTimer -= Time.deltaTime()
        if (this.jumpSpriteTimer < 0) this.renderer.setDrawable(this.glideSprite)

        this.trailDotSpawnTimer -= Time.deltaTime()
        if (this.trailDotSpawnTimer < 0)
        {
            const trailDot = new TrailDot("Dot", this.transform.position)
            trailDot.start()
            this.trailDotSpawnTimer = this.trailDotSpawnTimeout
        }
    }

    public turnLeft(): void {
        this.isMovingRight = false
        this.jumpSprite.flipX = false
        this.glideSprite.flipX = false
    }

    public turnRight(): void {
        this.isMovingRight = true
        this.jumpSprite.flipX = true
        this.glideSprite.flipX = true
    }

    private gameStateChangedHandler(gameState: GameState): void {
        if (gameState === GameState.WELCOME)
        {
            this.isLocked = true
            this.transform.position.x = 0
        } else if (gameState === GameState.PLAY)
        {
            this.isAlive = true
            this.isLocked = false
            this.jump()
        } else if (gameState === GameState.RESULT)
        {
        }
    }

    private move(): void {
        if (this.isMovingRight)
        {
            this.transform.position.x += Time.deltaTime() * this.moveSpeed
        } else
        {
            this.transform.position.x -= Time.deltaTime() * this.moveSpeed
        }
    }

    private jump(): void {
        if (!this.isAlive) return
        this.renderer.setDrawable(this.jumpSprite)
        this.lastJumpTime = Time.timeSinceGameStart()
        this.lastJumpPosY = this.transform.position.y
        this.jumpSpriteTimer = this.jumpSpriteTimeout
    }

    private jumpYFunction(elapsedTime: number): number {
        const x = elapsedTime * this.jumpCurveXCoeff
        return (-(Math.pow(x - 1, 2)) + 1) * this.jumpCurveYCoeff + this.lastJumpPosY
    }

    private handleCollisionStart(collider: Collider): void {
        if (collider.owner.name === "Wall")
        {
            if (this.isMovingRight) this.touchedRightWall.invoke()
            else this.touchedLeftWall.invoke()
        } else if (collider.owner.name === "Spike")
        {
            this.isAlive = false
            BirdGame.changeState(GameState.RESULT)
        }
    }

    private wallTouchedHandler(): void {
        if (!this.isAlive) return
        BirdGame.currentScore++
    }

    private playIdleAnimation(): void {
        if (Math.round(Time.timeSinceGameStart()) % 2 === 0) this.renderer.setDrawable(this.glideSprite)
        else this.renderer.setDrawable(this.jumpSprite)

        this.transform.position.y = Math.sin(Time.timeSinceGameStart()) * 20
    }
}

export default Bird