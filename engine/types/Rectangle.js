import Canvas from "../system/Canvas.js";
class Rectangle {
    constructor(size, color) {
        this.color = color;
        this.size = size;
    }
    _draw() {
        Canvas._canvasContext.fillStyle = this.color.toHex();
        Canvas._canvasContext.fillRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
    }
}
export default Rectangle;
//# sourceMappingURL=Rectangle.js.map