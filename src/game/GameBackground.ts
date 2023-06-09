import Node from "../engine/node/Node"
import Transform from "../engine/component/Transform"
import RectangleCollider from "../engine/component/RectangleCollider"
import Renderer from "../engine/component/Renderer"
import Rectangle from "../engine/rendering/Rectangle"
import ComponentType from "../engine/component/ComponentType"
import Color from "../engine/math/Color"
import BirdGame from "./BirdGame"
import Canvas from "../engine/system/Canvas/Canvas"
import ThemeManager from "./ThemeManager"
import Ease from "../engine/system/tween/Ease"

class GameBackground extends Node
{
    public transform: Transform
    public collider: RectangleCollider
    public renderer: Renderer
    private rectangle: Rectangle

    constructor(name: string) {
        super(name)

        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        this.rectangle = new Rectangle(Canvas.canvasSize, Color.WHITE)
        this.renderer = this.addComponent(ComponentType.RENDERER) as Renderer
        this.renderer.setDrawable(this.rectangle)
        this.renderer.drawOrder = -100

        BirdGame.scoreChanged.subscribe(this.scoreChangedHandler.bind(this))
    }

    private scoreChangedHandler(score: number) {
        this.renderer.tweenColor(ThemeManager.getSecondaryColor(score), 0.3, 0, Ease.OUT_CUBIC, false)
    }
}

export default GameBackground