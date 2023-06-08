import Component from "./Component"
import ComponentType from "./ComponentType"
import Node from "../node/Node"
import Transform from "./Transform"
import Canvas from "../system/Canvas"
import Drawable from "../types/Drawable"
import Matrix from "../types/Matrix"
import Vector from "../types/Vector"

class Renderer extends Component
{
    // COMPONENT METADATA //
    public readonly type: ComponentType = ComponentType.RENDERER
    public readonly _componentRequirements: ComponentType[] = [ComponentType.TRANSFORM]

    // COMPONENT PROPERTIES //
    public drawOrder: number = 0
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
        this.drawable._draw()
    }
}

export default Renderer
