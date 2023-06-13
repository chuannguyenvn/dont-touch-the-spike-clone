import ComponentType from './ComponentType'
import Node from '../Node'
import Collider from './Collider'
import Vector from '../../math/Vector'
import Rect from '../../math/Rect'

class CircleCollider extends Collider {
    // COMPONENT METADATA //
    public readonly type: ComponentType = ComponentType.CIRCLE_COLLIDER

    // COMPONENT PROPERTIES //
    public radius: number

    constructor(owner: Node, radius = 1, offset: Vector = Vector.ZERO) {
        super(owner)
        this.radius = radius
        this.offset = offset
    }

    public AABB(): Rect {
        const position = this._ownerTransform.globalPosition
        return new Rect(position.add(this.offset), Vector.ONE.multiply(2))
    }
}

export default CircleCollider
