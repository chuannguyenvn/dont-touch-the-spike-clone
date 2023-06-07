import ComponentType from "./ComponentType.js";
import Collider from "./Collider.js";
import Vector from "../types/Vector.js";
import Rect from "../types/Rect.js";
class RectangleCollider extends Collider {
    constructor(owner, size = Vector.one(), offset = Vector.zero()) {
        super(owner);
        // COMPONENT METADATA //
        this.type = ComponentType.RECTANGLE_COLLIDER;
        this.size = size;
        this.offset = offset;
    }
    AABB() {
        let position = this.ownerTransform.position;
        return new Rect(position.add(this.offset), this.size);
    }
}
export default RectangleCollider;
//# sourceMappingURL=RectangleCollider.js.map