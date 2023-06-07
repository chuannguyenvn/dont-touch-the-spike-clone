import Canvas from "../system/Canvas.js";
import Vector from "./Vector.js";
class Rectangle {
    constructor(size, color) {
        this.color = color;
        this.size = size;
    }
    _draw(offset = new Vector(-this.size.x / 2, -this.size.y / 2)) {
        Canvas._canvasContext.fillStyle = this.color.toHex();
        Canvas._canvasContext.fillRect(offset.x, offset.y, this.size.x, this.size.y);
    }
}
export default Rectangle;
//# sourceMappingURL=Rectangle.js.map