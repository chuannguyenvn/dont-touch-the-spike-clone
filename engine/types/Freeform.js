import Canvas from "../system/Canvas.js";
class Freeform {
    constructor(color) {
        this.color = color;
    }
    setPoints(points) {
        this.points = points;
    }
    draw() {
        Canvas.canvasContext.fillStyle = this.color.toHex();
        Canvas.canvasContext.beginPath();
        for (let i = 0; i < this.points.length; i++) {
            Canvas.canvasContext.lineTo(this.points[i].x, this.points[i].y);
        }
        Canvas.canvasContext.fill();
    }
}
export default Freeform;
//# sourceMappingURL=Freeform.js.map