import Canvas from "../system/Canvas.js";
class Circle {
    constructor(size, color) {
        this.color = color;
        this.size = size;
    }
    _draw() {
        Canvas._canvasContext.fillStyle = this.color.toHex();
        Canvas._canvasContext.beginPath();
        Canvas._canvasContext.arc(0, 0, this.size, 0, 2 * Math.PI);
        Canvas._canvasContext.fill();
    }
}
export default Circle;
//# sourceMappingURL=Circle.js.map