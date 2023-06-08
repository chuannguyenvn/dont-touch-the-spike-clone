import Node from "./engine/node/Node"
import Transform from "./engine/component/Transform"
import RectangleCollider from "./engine/component/RectangleCollider"
import Renderer from "./engine/component/Renderer"
import ComponentType from "./engine/component/ComponentType"
import Vector from "./engine/types/Vector"
import Color from "./engine/types/Color"
import Freeform from "./engine/types/Freeform"
import Ease from "./engine/system/tween/Ease"
import Maths from "./engine/utility/Maths"

class Spike extends Node
{
    public transform: Transform
    public collider: RectangleCollider
    public renderer: Renderer
    private showingPosX: number
    private hidingPosX: number
    
    public init(): void
    {
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        this.collider = this.addComponent(ComponentType.RECTANGLE_COLLIDER) as RectangleCollider
        this.collider.size = new Vector(50, 50)

        let triangle = new Freeform(Color.grey())
        triangle.setPoints([new Vector(25, 0), new Vector(0, 25),
            new Vector(-25, 0), new Vector(0, -25)])
        this.renderer = this.addComponent(ComponentType.RENDERER) as Renderer
        this.renderer.setDrawable(triangle)
    }

    start(): void
    {
        this.showingPosX = Maths.sign(this.transform.position.x) * 200
        this.hidingPosX =  Maths.sign(this.transform.position.x) * 250
    }

    public show(): void
    {
        this.transform.tweenPositionX(this.showingPosX, 0.2, 0, Ease.LINEAR, false)
    }

    public hide(): void
    {
        this.transform.tweenPositionX(this.hidingPosX, 0.2, 0, Ease.LINEAR, false)
    }
}

export default Spike