import ComponentType from "./ComponentType.js"
import Node from "../node/Node.js"
import Collider from "./Collider.js"
import Vector from "../types/Vector.js"
import Rect from "../types/Rect.js"

class CircleCollider extends Collider
{
    // COMPONENT METADATA //
    public readonly type: ComponentType = ComponentType.RECTANGLE_COLLIDER

    // COMPONENT PROPERTIES //
    public size: number

    constructor(owner: Node, size: number = 1, offset: Vector = Vector.zero())
    {
        super(owner)
        this.size = size
        this.offset = offset
    }

    public AABB(): Rect
    {
        let position = this._ownerTransform.position
        return new Rect(position.add(this.offset), Vector.one().multiply(2))
    }
}

export default CircleCollider