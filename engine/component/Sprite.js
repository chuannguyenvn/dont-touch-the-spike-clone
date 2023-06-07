import Component from "./Component.js";
import ComponentType from "./ComponentType.js";
import Canvas from "../system/Canvas.js";
class Sprite extends Component {
    constructor(owner, imagePath = "") {
        super(owner);
        // COMPONENT METADATA //
        this.type = ComponentType.SPRITE;
        this.componentRequirements = [ComponentType.TRANSFORM];
        this.setImage(imagePath);
        this.ownerTransform = owner.getComponent(ComponentType.TRANSFORM);
        Canvas.registerSprite(this);
    }
    draw() {
        let position = this.ownerTransform.position;
        Canvas.canvasContext.drawImage(this.image, position.x, position.y);
    }
    setImage(imagePath) {
        this.image = new Image();
        this.image.src = imagePath;
    }
}
export default Sprite;
//# sourceMappingURL=Sprite.js.map