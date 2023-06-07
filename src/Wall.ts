import Node from "../engine/node/Node.js"
import Transform from "../engine/component/Transform.js"
import Renderer from "../engine/component/Renderer.js"
import ComponentType from "../engine/component/ComponentType.js"
import Vector from "../engine/types/Vector.js"
import RectangleCollider from "../engine/component/RectangleCollider.js"
import Rectangle from "../engine/types/Rectangle.js"
import Color from "../engine/types/Color.js"

class Wall extends Node
{
    public transform: Transform
    public collider: RectangleCollider
    public renderer: Renderer

    public init()
    {
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        this.collider = this.addComponent(ComponentType.RECTANGLE_COLLIDER) as RectangleCollider
        this.collider.size = new Vector(100, 600)
        
        let rectangle = new Rectangle(new Vector(100, 600), new Color(1,0.5,0))
        this.renderer = this.addComponent(ComponentType.RENDERER) as Renderer
        this.renderer.setDrawable(rectangle)
    }
}

export default Wall