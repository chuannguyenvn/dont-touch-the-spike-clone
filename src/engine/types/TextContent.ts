import Drawable from "./Drawable"
import Color from "./Color"
import Vector from "./Vector"
import Canvas from "../system/Canvas"

class TextContent implements Drawable
{
    public text: string
    public color: Color
    public drawOrder: number
    public offSet: Vector
    public font: string
    
    constructor(text: string, color: Color = Color.black())
    {
        this.text = text
        this.color = color
    }
    
    _draw(): void 
    {
        Canvas._canvasContext.font = this.font
        Canvas._canvasContext.textAlign = "center"
        Canvas._canvasContext.textBaseline = "middle"
        Canvas._canvasContext.fillStyle = this.color.toHex()
        Canvas._canvasContext.fillText(this.text, this.offSet.x, this.offSet.y)
        const metrics = Canvas._canvasContext.measureText(this.text)
        const fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
        const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
        const elementSize = new Vector(metrics.width, actualHeight)
    }
}

export default TextContent