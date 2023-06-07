import Canvas from "../system/Canvas.js";
class Freeform {
    constructor(color) {
        this.color = color;
    }
    _draw() {
        Canvas._canvasContext.fillStyle = this.color.toHex();
        Canvas._canvasContext.beginPath();
        for (let i = 0; i < this._points.length; i++) {
            Canvas._canvasContext.lineTo(this._points[i].x, this._points[i].y);
        }
        Canvas._canvasContext.fill();
    }
    setPoints(points) {
        this._points = points;
    }
}
export default Freeform;
//# sourceMappingURL=Freeform.js.map