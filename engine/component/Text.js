import { UIElement } from "./UIElement.js";
import Canvas from "../system/Canvas.js";
import Vector from "../types/Vector.js";
class Text extends UIElement {
    constructor(owner) {
        super(owner);
    }
    setDrawable(drawable) {
        super.setDrawable(drawable);
        let metrics = Canvas._canvasContext.measureText(drawable.text);
        let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
        let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        this.elementSize = new Vector(metrics.width, actualHeight);
    }
}
export default Text;
//# sourceMappingURL=Text.js.map