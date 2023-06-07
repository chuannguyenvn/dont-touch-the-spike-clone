import Vector from "../types/Vector.js";
import ComponentType from "./ComponentType.js";
import Component from "./Component.js";
import Tween from "../system/tween/Tween.js";
class Transform extends Component {
    constructor(owner, position = Vector.zero(), rotation = 0, scale = Vector.one()) {
        super(owner);
        // COMPONENT METADATA //
        this.type = ComponentType.TRANSFORM;
        this.componentRequirements = [];
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
    tweenPosition(to, duration, delay, ease) {
        const evaluate = (x) => {
            this.position = (to.subtract(tween.startValue)).multiply(x).add(tween.startValue);
        };
        let tween = new Tween(evaluate, () => this.position, duration, delay, ease);
        return tween;
    }
}
export default Transform;
//# sourceMappingURL=Transform.js.map