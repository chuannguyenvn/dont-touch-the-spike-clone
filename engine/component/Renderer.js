import Component from "./Component.js";
import ComponentType from "./ComponentType.js";
import Canvas from "../system/Canvas.js";
import Vector from "../types/Vector.js";
class Renderer extends Component {
    constructor(owner) {
        super(owner);
        // COMPONENT METADATA //
        this.type = ComponentType.RENDERER;
        this._componentRequirements = [ComponentType.TRANSFORM];
        this.ownerTransform = owner.getComponent(ComponentType.TRANSFORM);
        Canvas._registerRenderer(this);
    }
    _localToWorldMatrix() {
        return this.ownerTransform._localToWorldMatrix();
    }
    setDrawable(drawable) {
        this.drawable = drawable;
    }
    _draw() {
        this.drawable._draw(Vector.zero());
    }
}
export default Renderer;
//# sourceMappingURL=Renderer.js.map