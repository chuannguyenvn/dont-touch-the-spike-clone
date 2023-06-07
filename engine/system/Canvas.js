import Vector from "../types/Vector.js";
import Color from "../types/Color.js";
import Matrix from "../types/Matrix.js";
class Canvas {
    static init(canvasContext) {
        Canvas.canvasContext = canvasContext;
        let translationMatrix = Matrix.translate(-Canvas.canvasSize.x / 4, Canvas.canvasSize.y / 4);
        let scaleMatrix = Matrix.scale(1, 1);
        this.worldToCameraMatrix = scaleMatrix.multiplyMatrix(translationMatrix);
    }
    static draw() {
        Canvas.canvasContext.clearRect(0, 0, Canvas.canvasSize.x, Canvas.canvasSize.y);
        Canvas.canvasContext.fillStyle = 'white';
        Canvas.canvasContext.fillRect(0, 0, Canvas.canvasSize.x, Canvas.canvasSize.y);
        for (let sprite of this.sprites) {
            let localToWorld = sprite.localToWorldMatrix();
            let worldToCamera = Matrix.identity(); // Canvas.worldToCameraMatrix
            let res = worldToCamera.multiplyMatrix(localToWorld);
            Canvas.canvasContext.setTransform(res.values[0][0], res.values[1][0], res.values[0][1], res.values[1][1], res.values[0][2], res.values[1][2]);
            sprite.draw();
            Canvas.canvasContext.resetTransform();
        }
    }
    static registerSprite(sprite) {
        this.sprites.push(sprite);
    }
}
Canvas.canvasSize = new Vector(400, 600);
Canvas.sprites = [];
Canvas.backgroundColor = Color.white();
export default Canvas;
//# sourceMappingURL=Canvas.js.map