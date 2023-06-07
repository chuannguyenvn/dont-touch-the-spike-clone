import Component from "./Component.js"
import ComponentType from "./ComponentType.js"
import Node from "../node/Node.js"
import Transform from "./Transform.js"
import Canvas from "../system/Canvas.js"
import Drawable from "../types/Drawable.js"
import Matrix from "../types/Matrix.js"
import Vector from "../types/Vector.js"

class Renderer extends Component
{
    // COMPONENT METADATA //
    public readonly type: ComponentType = ComponentType.RENDERER
    public readonly _componentRequirements: ComponentType[] = [ComponentType.TRANSFORM]

    // COMPONENT PROPERTIES //
    protected drawable: Drawable
    private ownerTransform: Transform

    constructor(owner: Node)
    {
        super(owner)
        this.ownerTransform = owner.getComponent(ComponentType.TRANSFORM) as Transform

        Canvas._registerRenderer(this)
    }

    public _localToWorldMatrix(): Matrix
    {
        return this.ownerTransform._localToWorldMatrix()
    }

    public setDrawable(drawable: Drawable): void
    {
        this.drawable = drawable
    }

    public _draw(): void
    {
        this.drawable._draw(Vector.zero())
    }
}

export default Renderer
