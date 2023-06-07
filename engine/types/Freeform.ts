import Drawable from "./Drawable.js"
import Canvas from "../system/Canvas.js"
import Color from "./Color.js"
import Vector from "./Vector.js"

class Freeform implements Drawable
{
    public drawOrder: number
    public color: Color
    public points: Vector[]

    constructor(color: Color)
    {
        this.color = color
    }

    public setPoints(points: Vector[])
    {
        this.points = points
    }

    public draw(): void
    {
        Canvas.canvasContext.fillStyle = this.color.toHex()

        Canvas.canvasContext.beginPath()
        for (let i = 0; i < this.points.length; i++)
        {
            Canvas.canvasContext.lineTo(this.points[i].x, this.points[i].y)
        }
        Canvas.canvasContext.fill()
    }
}

export default Freeform