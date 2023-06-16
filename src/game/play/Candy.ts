import Node from '../../engine/node/Node'
import Transform from '../../engine/node/component/Transform'
import RectangleCollider from '../../engine/node/component/RectangleCollider'
import Renderer from '../../engine/node/component/Renderer'
import ComponentType from '../../engine/node/component/ComponentType'
import Vector from '../../engine/math/Vector'
import SpriteType from '../../engine/configs-and-resources/SpriteTypes'
import Sprite from '../../engine/rendering/Sprite'
import Ease from '../../engine/utility/tween/Ease'
import Physics from '../../engine/system/Physics'
import BirdGame from '../BirdGame'
import GameState from '../GameState'
import System from '../../engine/system/System'
import Time from '../../engine/system/Time'
import Maths from '../../engine/math/Maths'

class Candy extends Node {
    public transform: Transform
    public collider: RectangleCollider
    public renderer: Renderer

    private initPosY: number

    public init(): void {
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        this.collider = this.addComponent(ComponentType.RECTANGLE_COLLIDER) as RectangleCollider
        this.collider.size = new Vector(40, 40)

        const candySprite = new Sprite(SpriteType.CANDY)
        candySprite.scale = Vector.ONE.multiply(0.25)
        this.renderer = this.addComponent(ComponentType.RENDERER) as Renderer
        this.renderer.setDrawable(candySprite)
        this.renderer.drawOrder = 100

        this.transform.scale = Vector.ZERO
        this.transform.tweenScale(Vector.ONE, 0.5, 0, Ease.OUT_CUBIC, false)

        BirdGame.stateMachine
            .configure(GameState.RESULT)
            .onExit(this.getGuid(), this.destroy.bind(this))
    }

    start() {
        this.initPosY = this.transform.globalPosition.y
    }

    update() {
        this.transform.globalPosition = this.transform.globalPosition.withY(
            Math.sin(Time.timeSinceGameStart()) * 5
        )
        this.transform.rotation = Math.sin(Time.timeSinceGameStart() * 1.2) * 10
    }

    public destroy() {
        System._unregisterRootNode(this)
        Physics._unregisterCollider(this.collider)
        this.transform.globalPosition = new Vector(999, 999)
    }
}

export default Candy
