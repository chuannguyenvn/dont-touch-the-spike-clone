import Vector from "../types/Vector.js";
import ComponentType from "./ComponentType.js";
import Component from "./Component.js";
import Tween from "../system/tween/Tween.js";
import Matrix from "../types/Matrix.js";
class Transform extends Component {
    constructor(owner, position = Vector.zero(), rotation = 0, scale = Vector.one()) {
        super(owner);
        // COMPONENT METADATA //
        this.type = ComponentType.TRANSFORM;
        this._componentRequirements = [];
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
    _localToWorldMatrix() {
        const translationMatrix = Matrix.translate(this.position.x, this.position.y);
        const rotationMatrix = Matrix.rotate(this.rotation);
        const scaleMatrix = Matrix.scale(this.scale.x, this.scale.y);
        return translationMatrix.multiplyMatrix(rotationMatrix).multiplyMatrix(scaleMatrix);
    }
    tweenPosition(to, duration, delay, ease, relative) {
        const evaluate = (x) => {
            if (relative)
                to.add(tween._startValue);
            this.position = (to.subtract(tween._startValue)).multiply(x).add(tween._startValue);
        };
        let tween = new Tween(evaluate, () => this.position, duration, delay, ease);
        return tween;
    }
    tweenPositionX(to, duration, delay, ease, relative) {
        const evaluate = (x) => {
            if (relative)
                to += tween._startValue;
            this.position.x = (to - tween._startValue) * x + tween._startValue;
        };
        let tween = new Tween(evaluate, () => this.position.x, duration, delay, ease);
        return tween;
    }
    tweenPositionY(to, duration, delay, ease, relative) {
        const evaluate = (x) => {
            if (relative)
                to += tween._startValue;
            this.position.y = (to - tween._startValue) * x + tween._startValue;
        };
        let tween = new Tween(evaluate, () => this.position.y, duration, delay, ease);
        return tween;
    }
}
export default Transform;
//# sourceMappingURL=Transform.js.map