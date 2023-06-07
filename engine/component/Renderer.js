import Component from "./Component.js";
import ComponentType from "./ComponentType.js";
import Canvas from "../system/Canvas.js";
class Renderer extends Component {
    constructor(owner) {
        super(owner);
        // COMPONENT METADATA //
        this.type = ComponentType.RENDERER;
        this.componentRequirements = [ComponentType.TRANSFORM];
        this.ownerTransform = owner.getComponent(ComponentType.TRANSFORM);
        Canvas.registerSprite(this);
    }
    localToWorldMatrix() {
        return this.ownerTransform.localToWorldMatrix();
    }
    setDrawable(drawable) {
        this.drawable = drawable;
    }
    draw() {
        this.drawable.draw();
    }
}
export default Renderer;
//# sourceMappingURL=Renderer.js.map