import Drawable from "./Drawable"
import Color from "./Color"
import Vector from "./Vector"
import Canvas from "../system/Canvas"

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
        Canvas._canvasContext.font = "30px Verdana"
        Canvas._canvasContext.fillStyle = this.color.toHex()
        Canvas._canvasContext.fillText(this.text, offSet.x, offSet.y)
        const metrics = Canvas._canvasContext.measureText(this.text)
        const fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
        const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
        const elementSize = new Vector(metrics.width, actualHeight)
        console.log(elementSize)

    }
}

export default TextContent