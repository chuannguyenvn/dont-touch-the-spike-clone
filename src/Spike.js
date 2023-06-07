import Node from "../engine/node/Node.js";
import ComponentType from "../engine/component/ComponentType.js";
import Vector from "../engine/types/Vector.js";
import Color from "../engine/types/Color.js";
import Freeform from "../engine/types/Freeform.js";
import Ease from "../engine/system/tween/Ease.js";
import Maths from "../engine/utility/Maths.js";
class Spike extends Node {
    init() {
        this.transform = this.addComponent(ComponentType.TRANSFORM);
        this.collider = this.addComponent(ComponentType.RECTANGLE_COLLIDER);
        this.collider.size = new Vector(50, 50);
        let triangle = new Freeform(Color.red());
        triangle.setPoints([new Vector(25, 0), new Vector(0, 25),
            new Vector(-25, 0), new Vector(0, -25)]);
        this.renderer = this.addComponent(ComponentType.RENDERER);
        this.renderer.setDrawable(triangle);
    }
    start() {
        this.showingPosX = this.transform.position.x;
        this.hidingPosX = this.transform.position.x + Maths.sign(this.transform.position.x) * 50;
    }
    show() {
        this.transform.tweenPositionX(this.showingPosX, 0.2, 0, Ease.LINEAR, false);
    }
    hide() {
        this.transform.tweenPositionX(this.hidingPosX, 0.2, 0, Ease.LINEAR, false);
    }
}
export default Spike;
//# sourceMappingURL=Spike.js.map