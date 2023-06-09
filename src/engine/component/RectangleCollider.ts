﻿import ComponentType from "./ComponentType"
import Node from "../node/Node"
import Collider from "./Collider"
import Vector from "../math/Vector"
import Rect from "../math/Rect"

class RectangleCollider extends Collider
{
    // COMPONENT METADATA //
    public readonly type: ComponentType = ComponentType.RECTANGLE_COLLIDER

    // COMPONENT PROPERTIES //
    public size: Vector

    constructor(owner: Node, size: Vector = Vector.ONE, offset: Vector = Vector.ZERO) {
        super(owner)
        this.size = size
        this.offset = offset
    }

    public AABB(): Rect {
        const position = this._ownerTransform.position
        return new Rect(position.add(this.offset), this.size)
    }
}

export default RectangleCollider