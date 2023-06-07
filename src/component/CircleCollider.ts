﻿import ComponentType from "./ComponentType.js"
import Actor from "../actor/Actor.js"
import Collider from "./Collider.js"
import Vector from "../types/Vector.js"
import Rect from "../types/Rect.js"

class CircleCollider extends Collider
{
    // COMPONENT METADATA //
    public readonly type: ComponentType = ComponentType.RECTANGLE_COLLIDER

    // COMPONENT PROPERTIES //
    public size: number

    constructor(owner: Actor, size: number = 1, offset: Vector = Vector.zero())
    {
        super(owner)
        this.size = size
        this.offset = offset
    }

    public AABB(): Rect
    {
        let position = this.ownerTransform.position
        return new Rect(position.add(this.offset), Vector.one().multiply(2))
    }
}

export default CircleCollider