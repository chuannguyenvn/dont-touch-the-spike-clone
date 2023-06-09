import ComponentType from "./ComponentType"
import Node from "../node/Node"
import Collider from "./Collider"
import Vector from "../math/Vector"
import Rect from "../math/Rect"

class CircleCollider extends Collider
{
    // COMPONENT METADATA //
    public readonly type: ComponentType = ComponentType.RECTANGLE_COLLIDER

    // COMPONENT PROPERTIES //
    public size: number

    constructor(owner: Node, size = 1, offset: Vector = Vector.ZERO) {
        super(owner)
        this.size = size
        this.offset = offset
    }

    public AABB(): Rect {
        const position = this._ownerTransform.position
        return new Rect(position.add(this.offset), Vector.ONE.multiply(2))
    }
}

export default CircleCollider