import Drawable from "./Drawable.js"
import Color from "./Color.js"
import Vector from "./Vector.js"
import Canvas from "../system/Canvas.js"

class TextContent implements Drawable
{
    public text: string
    public color: Color
    public drawOrder: number

    constructor(text: string, color: Color = Color.black())
    {
        this.text = text
        this.color = color
    }
    
    _draw(offSet: Vector): void
    {
        Canvas._canvasContext.font = "30px Verdana";
        Canvas._canvasContext.fillStyle = this.color.toHex()
        Canvas._canvasContext.fillText(this.text, offSet.x, offSet.y)
    }
}

export default TextContent