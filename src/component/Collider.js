import Component from "./Component.js";
import ComponentType from "./ComponentType.js";
import { ParamGameEvent } from "../types/Event.js";
import Physics from "../system/Physics.js";
class Collider extends Component {
    constructor(owner) {
        super(owner);
        // COMPONENT METADATA //
        this.componentRequirements = [ComponentType.TRANSFORM];
        // COMPONENT PROPERTIES //
        this.collisionStarted = new ParamGameEvent();
        this.collisionHappening = new ParamGameEvent();
        this.collisionEnded = new ParamGameEvent();
        this.currentFrameCollidingColliders = [];
        this.lastFrameCollidingColliders = [];
        Physics.registerCollider(this);
        this.ownerTransform = owner.getComponent(ComponentType.TRANSFORM);
    }
    getWorldPosition() {
        return this.ownerTransform.position.add(this.offset);
    }
    addCollidingCollider(collider) {
        this.currentFrameCollidingColliders.push(collider);
        if (this.lastFrameCollidingColliders.findIndex(c => c === collider) === -1) {
            this.collisionStarted.invoke(collider);
        }
        else {
            this.collisionHappening.invoke(collider);
        }
    }
    confirmCollidingColliders() {
        for (let collider of this.lastFrameCollidingColliders) {
            if (this.currentFrameCollidingColliders.findIndex(c => c === collider) === -1) {
                this.collisionEnded.invoke(collider);
            }
        }
        this.lastFrameCollidingColliders = this.currentFrameCollidingColliders;
    }
}
export default Collider;
//# sourceMappingURL=Collider.js.map