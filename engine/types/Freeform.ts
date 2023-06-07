import Drawable from "./Drawable.js"
import Canvas from "../system/Canvas.js"
import Color from "./Color.js"
import Vector from "./Vector.js"

class Freeform implements Drawable
{
    public drawOrder: number
    public color: Color
    public _points: Vector[]

    constructor(color: Color)
    {
        this.color = color
    }

    public _draw(): void
    {
        Canvas._canvasContext.fillStyle = this.color.toHex()

        Canvas._canvasContext.beginPath()
        for (let i = 0; i < this._points.length; i++)
        {
            Canvas._canvasContext.lineTo(this._points[i].x, this._points[i].y)
        }
        Canvas._canvasContext.fill()
    }
    
    public setPoints(points: Vector[])
    {
        this._points = points
    }
}

export default Freeform