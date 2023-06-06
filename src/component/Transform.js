import Vector2 from "../types/Vector2.js";
import ComponentType from "./ComponentType.js";
import Component from "./Component.js";
class Transform extends Component {
    constructor(owner, position = Vector2.zero(), rotation = 0, scale = Vector2.one()) {
        super(owner);
        // COMPONENT METADATA //
        this.type = ComponentType.TRANSFORM;
        this.componentRequirements = [];
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
}
export default Transform;
//# sourceMappingURL=Transform.js.map