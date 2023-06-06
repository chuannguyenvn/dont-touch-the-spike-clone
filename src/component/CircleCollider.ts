import ComponentType from "./ComponentType.js"
import Actor from "../actor/Actor.js"
import Collider from "./Collider.js"
import Vector2 from "../types/Vector2.js"
import Rect from "../types/Rect.js"

class CircleCollider extends Collider
{
    // COMPONENT METADATA //
    public readonly type: ComponentType = ComponentType.RECTANGLE_COLLIDER

    // COMPONENT PROPERTIES //
    public size: number

    constructor(owner: Actor, size: number = 1, offset: Vector2 = Vector2.zero())
    {
        super(owner)
        this.size = size
        this.offset = offset
    }

    public AABB(): Rect
    {
        let position = this.ownerTransform.position
        return new Rect(position.add(this.offset), Vector2.one().multiply(2))
    }
}

export default CircleCollider