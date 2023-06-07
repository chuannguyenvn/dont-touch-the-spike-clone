import Color from "./Color.js";
import Canvas from "../system/Canvas.js";
class TextContent {
    constructor(text, color = Color.black()) {
        this.text = text;
        this.color = color;
    }
    _draw(offSet) {
        Canvas._canvasContext.font = "30px Verdana";
        Canvas._canvasContext.fillStyle = this.color.toHex();
        Canvas._canvasContext.fillText(this.text, offSet.x, offSet.y);
    }
}
export default TextContent;
//# sourceMappingURL=TextContent.js.map