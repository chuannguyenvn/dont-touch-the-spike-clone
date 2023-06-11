import Node from '../../engine/node/Node'
import Transform from '../../engine/node/component/Transform'
import RectangleCollider from '../../engine/node/component/RectangleCollider'
import Renderer from '../../engine/node/component/Renderer'
import ComponentType from '../../engine/node/component/ComponentType'
import Vector from '../../engine/math/Vector'
import Color from '../../engine/math/Color'
import Freeform from '../../engine/rendering/Freeform'
import Ease from '../../engine/system/tween/Ease'
import Maths from '../../engine/math/Maths'
import BirdGame from '../BirdGame'
import ThemeManager from '../ThemeManager'

class Spike extends Node {
    public transform: Transform
    public collider: RectangleCollider
    public renderer: Renderer
    private triangle: Freeform
    private showingPosX: number
    private hidingPosX: number

    public init(): void {
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        this.collider = this.addComponent(ComponentType.RECTANGLE_COLLIDER) as RectangleCollider
        this.collider.size = new Vector(50, 40)

        this.triangle = new Freeform(Color.GREY)
        this.triangle.setPoints([
            new Vector(25, 0),
            new Vector(0, 25),
            new Vector(-25, 0),
            new Vector(0, -25),
        ])
        this.renderer = this.addComponent(ComponentType.RENDERER) as Renderer
        this.renderer.setDrawable(this.triangle)
        this.renderer.drawOrder = 100

        BirdGame.scoreChanged.subscribe(this.scoreChangedHandler.bind(this))
    }

    start(): void {
        this.showingPosX = Maths.sign(this.transform.position.x) * 200
        this.hidingPosX = Maths.sign(this.transform.position.x) * 250
    }

    public show(): void {
        this.collider.isActive = true
        this.transform.tweenPositionX(this.showingPosX, 0.15, 0, Ease.LINEAR, false)
    }

    public hide(): void {
        this.collider.isActive = false
        this.transform.tweenPositionX(this.hidingPosX, 0.15, 0, Ease.LINEAR, false)
    }

    private scoreChangedHandler(score: number): void {
        this.renderer.tweenColor(ThemeManager.getPrimaryColor(score), 0.3, 0, Ease.OUT_CUBIC, false)
    }
}

export default Spike
