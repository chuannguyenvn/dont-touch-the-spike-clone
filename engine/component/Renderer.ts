import Component from "./Component.js"
import ComponentType from "./ComponentType.js"
import Node from "../node/Node.js"
import Transform from "./Transform.js"
import Canvas from "../system/Canvas.js"
import Drawable from "../types/Drawable.js"

class Renderer extends Component
{
    // COMPONENT METADATA //
    public readonly type: ComponentType = ComponentType.RENDERER
    public readonly componentRequirements: ComponentType[] = [ComponentType.TRANSFORM]

    // COMPONENT PROPERTIES //
    private drawable: Drawable
    private ownerTransform: Transform

    constructor(owner: Node)
    {
        super(owner)
        this.ownerTransform = owner.getComponent(ComponentType.TRANSFORM) as Transform

        Canvas.registerSprite(this)
    }

    public localToWorldMatrix()
    {
        return this.ownerTransform.localToWorldMatrix()
    }

    public setDrawable(drawable: Drawable)
    {
        this.drawable = drawable
    }

    draw(): void
    {
        this.drawable.draw()
    }
}

export default Renderer
