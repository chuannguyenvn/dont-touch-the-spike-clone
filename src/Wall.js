import Node from "../engine/node/Node.js";
import ComponentType from "../engine/component/ComponentType.js";
import Vector from "../engine/types/Vector.js";
import Rectangle from "../engine/types/Rectangle.js";
import Color from "../engine/types/Color.js";
class Wall extends Node {
    init() {
        this.transform = this.addComponent(ComponentType.TRANSFORM);
        this.collider = this.addComponent(ComponentType.RECTANGLE_COLLIDER);
        this.collider.size = new Vector(100, 600);
        let rectangle = new Rectangle(new Vector(100, 600), new Color(1, 0.5, 0));
        this.renderer = this.addComponent(ComponentType.RENDERER);
        this.renderer.setDrawable(rectangle);
    }
}
export default Wall;
//# sourceMappingURL=Wall.js.map