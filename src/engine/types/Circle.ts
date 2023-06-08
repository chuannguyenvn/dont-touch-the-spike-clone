import Drawable from "./Drawable"
import Color from "./Color"
import Canvas from "../system/Canvas"
import Vector from "./Vector"

class Circle implements Drawable
{
    public drawOrder: number
    public color: Color
    public size: number
    public offSet: Vector


    constructor(size: number, color: Color)
    {
        this.color = color
        this.size = size
    }

    public _draw(): void
    {
        Canvas._canvasContext.fillStyle = this.color.toString()
        Canvas._canvasContext.beginPath()
        Canvas._canvasContext.arc(0, 0, this.size, 0, 2 * Math.PI)
        Canvas._canvasContext.fill()
    }

}

export default Circle