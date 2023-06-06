import Vector2 from "../types/Vector2.js";
import ComponentType from "./ComponentType.js";
import Component from "./Component.js";
import vector2 from "../types/Vector2.js";
class Transform extends Component {
    constructor(position = Vector2.zero(), rotation = 0, scale = vector2.one()) {
        super();
        // Component metadata //
        this.type = ComponentType.TRANSFORM;
        this.componentRequirements = [];
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
}
export default Transform;
//# sourceMappingURL=Transform.js.map