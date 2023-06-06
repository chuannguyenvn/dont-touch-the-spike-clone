import Vector2 from "../types/Vector2.js";
import Color from "../types/Color.js";
class Canvas {
    static init(canvasContext) {
        Canvas.canvasContext = canvasContext;
    }
    static draw() {
        Canvas.canvasContext.clearRect(0, 0, Canvas.canvasSize.x, Canvas.canvasSize.y);
        for (let sprite of this.sprites) {
            sprite.draw();
        }
    }
    static registerSprite(sprite) {
        this.sprites.push(sprite);
    }
}
Canvas.canvasSize = new Vector2(400, 600);
Canvas.sprites = [];
Canvas.backgroundColor = Color.white();
export default Canvas;
//# sourceMappingURL=Canvas.js.map