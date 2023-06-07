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
        this.componentRequirements = [];
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
    localToWorldMatrix() {
        const translationMatrix = new Matrix();
        translationMatrix.values[2][0] = this.position.x;
        translationMatrix.values[2][1] = this.position.y;
        const rotationMatrix = new Matrix();
        const cosTheta = Math.cos(this.rotation);
        const sinTheta = Math.sin(this.rotation);
        rotationMatrix.values[0][0] = cosTheta;
        rotationMatrix.values[0][1] = -sinTheta;
        rotationMatrix.values[1][0] = sinTheta;
        rotationMatrix.values[1][1] = cosTheta;
        const scaleMatrix = new Matrix();
        scaleMatrix.values[0][0] = this.scale.x;
        scaleMatrix.values[1][1] = this.scale.y;
        return translationMatrix.multiplyMatrix(rotationMatrix).multiplyMatrix(scaleMatrix);
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