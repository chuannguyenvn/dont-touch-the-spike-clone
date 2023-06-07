import Node from "../engine/node/Node.js";
import ComponentType from "../engine/component/ComponentType.js";
import Vector from "../engine/types/Vector.js";
import Rectangle from "../engine/types/Rectangle.js";
import Color from "../engine/types/Color.js";
import Spike from "./Spike.js";
import Maths from "../engine/utility/Maths.js";
class Wall extends Node {
    constructor() {
        super(...arguments);
        this.spikes = [];
    }
    init() {
        this.transform = this.addComponent(ComponentType.TRANSFORM);
        this.collider = this.addComponent(ComponentType.RECTANGLE_COLLIDER);
        this.collider.size = new Vector(10, 600);
        let rectangle = new Rectangle(new Vector(10, 600), new Color(1, 0.5, 0));
        this.renderer = this.addComponent(ComponentType.RENDERER);
        this.renderer.setDrawable(rectangle);
    }
    start() {
        for (let y = -200; y <= 200; y += 50) {
            let spike = new Spike("Spike");
            spike.setParent(this);
            spike.transform.position = new Vector(this.transform.position.x, y);
            spike.start();
            this.spikes.push(spike);
        }
    }
    showSpike() {
        for (let i = 0; i < this.spikes.length; i++) {
            if (Maths.randomRangeInt(0, 2) == 0) {
                this.spikes[i].show();
            }
        }
    }
    hideSpike() {
        for (let i = 0; i < this.spikes.length; i++) {
            this.spikes[i].hide();
        }
    }
}
export default Wall;
//# sourceMappingURL=Wall.js.map