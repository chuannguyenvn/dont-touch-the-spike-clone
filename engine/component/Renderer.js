import Component from "./Component.js";
import ComponentType from "./ComponentType.js";
import Canvas from "../system/Canvas.js";
class Renderer extends Component {
    constructor(owner) {
        super(owner);
        // COMPONENT METADATA //
        this.type = ComponentType.RENDERER;
        this._componentRequirements = [ComponentType.TRANSFORM];
        this.ownerTransform = owner.getComponent(ComponentType.TRANSFORM);
        Canvas._registerSprite(this);
    }
    _localToWorldMatrix() {
        return this.ownerTransform._localToWorldMatrix();
    }
    setDrawable(drawable) {
        this.drawable = drawable;
    }
    draw() {
        this.drawable._draw();
    }
}
export default Renderer;
//# sourceMappingURL=Renderer.js.map