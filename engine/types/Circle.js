import Canvas from "../system/Canvas.js";
class Circle {
    constructor(size, color) {
        this.color = color;
        this.size = size;
    }
    draw() {
        Canvas.canvasContext.fillStyle = this.color.toHex();
        Canvas.canvasContext.beginPath();
        Canvas.canvasContext.arc(0, 0, this.size, 0, 2 * Math.PI);
        Canvas.canvasContext.fill();
    }
}
export default Circle;
//# sourceMappingURL=Circle.js.map