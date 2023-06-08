import Drawable from "./Drawable.js"
import Canvas from "../system/Canvas.js"
import Color from "./Color.js"
import Vector from "./Vector.js"

class Rectangle implements Drawable
{
    public drawOrder: number
    public color: Color
    public size: Vector

    constructor(size: Vector, color: Color)
    {
        this.color = color
        this.size = size
    }

    public _draw(offset: Vector = new Vector(-this.size.x / 2, -this.size.y / 2)): void
    {
        Canvas._canvasContext.fillStyle = this.color.toHex()
        Canvas._canvasContext.fillRect(offset.x, offset.y, this.size.x, this.size.y)
    }
}

export default Rectangle