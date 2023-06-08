import Node from "../engine/node/Node.js"
import ComponentType from "../engine/component/ComponentType.js"
import Sprite from "../engine/types/Sprite.js"
import Renderer from "../engine/component/Renderer.js"
import Transform from "../engine/component/Transform.js"
import Vector from "../engine/types/Vector.js"
import Ease from "../engine/system/tween/Ease.js"
import Input from "../engine/system/Input.js"
import Time from "../engine/system/Time.js"
import RectangleCollider from "../engine/component/RectangleCollider.js"
import Maths from "../engine/utility/Maths.js"
import Debug from "../engine/system/Debug.js"
import Collider from "../engine/component/Collider.js"
import {GameEvent} from "../engine/types/Event.js"

class Bird extends Node
{
    public touchedLeftWall: GameEvent
    public touchedRightWall: GameEvent
    
    public transform: Transform
    public collider: RectangleCollider
    public renderer: Renderer
    private lastJumpTime: number = 0
    private lastJumpPosY: number
    private isMovingRight: boolean = true
    private moveSpeed: number = 200
    private jumpCurveXCoeff: number = 3
    private jumpCurveYCoeff: number = 100

    public init()
    {
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.transform.position = new Vector(50, 100)
        this.lastJumpTime = Time.timeSinceGameStart()
        this.lastJumpPosY = this.transform.position.y

        this.collider = this.addComponent(ComponentType.RECTANGLE_COLLIDER) as RectangleCollider
        this.collider.size = new Vector(20, 20)
        this.collider.collisionStarted.subscribe(this.handleCollisionStart.bind(this))

        let sprite = new Sprite("./assets/kenney/Characters/character_0000.png")
        this.renderer = this.addComponent(ComponentType.RENDERER) as Renderer
        this.renderer.setDrawable(sprite)
 
        this.touchedLeftWall = new GameEvent()
        this.touchedRightWall = new GameEvent()
        this.touchedRightWall.subscribe(this.turnLeft.bind(this))
        this.touchedLeftWall.subscribe(this.turnRight.bind(this))
    }

    public update()
    {
        this.move()
        if (Input.getKeyDown(' ')) this.jump()

        let elapsedJumpTime = Time.timeSinceGameStart() - this.lastJumpTime
        this.transform.position.y = this.jumpYFunction(elapsedJumpTime)

        this.transform.position.x = Maths.clamp(this.transform.position.x, -200, 200)
        this.transform.position.y = Maths.clamp(this.transform.position.y, -300, 300)
    }

    private move(): void
    {
        if (this.isMovingRight)
        {
            this.transform.position.x += Time.deltaTime() * this.moveSpeed
        }
        else
        {
            this.transform.position.x -= Time.deltaTime() * this.moveSpeed
        }
    }

    public turnLeft(): void
    {
        this.isMovingRight = false
    }

    public turnRight(): void
    {
        this.isMovingRight = true
    }

    private jump(): void
    {
        this.lastJumpTime = Time.timeSinceGameStart()
        this.lastJumpPosY = this.transform.position.y
    }

    private jumpYFunction(elapsedTime: number): number
    {
        let x = elapsedTime * this.jumpCurveXCoeff
        return (-(Math.pow(x - 1, 2)) + 1) * this.jumpCurveYCoeff + this.lastJumpPosY
    }

    private handleCollisionStart(collider: Collider)
    {
        if (collider.owner.name === "Wall")
        {
            if (this.isMovingRight) this.touchedRightWall.invoke()
            else this.touchedLeftWall.invoke()
        }
        else if (collider.owner.name === "Spike")
        {
            console.log("lose")
        }
    }
}

export default Bird