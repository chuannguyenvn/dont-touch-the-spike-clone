import Component from "./Component.js";
import ComponentType from "./ComponentType.js";
import { ParamGameEvent } from "../types/Event.js";
import Physics from "../system/Physics.js";
class Collider extends Component {
    constructor(owner) {
        super(owner);
        // COMPONENT METADATA //
        this._componentRequirements = [ComponentType.TRANSFORM];
        // COMPONENT PROPERTIES //
        this._currentFrameCollidingColliders = [];
        this._lastFrameCollidingColliders = [];
        this.collisionStarted = new ParamGameEvent();
        this.collisionHappening = new ParamGameEvent();
        this.collisionEnded = new ParamGameEvent();
        Physics._registerCollider(this);
        this._ownerTransform = owner.getComponent(ComponentType.TRANSFORM);
    }
    _getWorldPosition() {
        return this._ownerTransform.position.add(this.offset);
    }
    _addCollidingCollider(collider) {
        this._currentFrameCollidingColliders.push(collider);
        if (this._lastFrameCollidingColliders.findIndex(c => c === collider) === -1) {
            this.collisionStarted.invoke(collider);
        }
        else {
            this.collisionHappening.invoke(collider);
        }
    }
    _confirmCollidingColliders() {
        for (let collider of this._lastFrameCollidingColliders) {
            if (this._currentFrameCollidingColliders.findIndex(c => c === collider) === -1) {
                this.collisionEnded.invoke(collider);
            }
        }
        this._lastFrameCollidingColliders = this._currentFrameCollidingColliders;
    }
}
export default Collider;
//# sourceMappingURL=Collider.js.map