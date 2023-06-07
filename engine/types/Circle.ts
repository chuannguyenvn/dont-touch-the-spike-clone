import Drawable from "./Drawable.js"
import Color from "./Color.js"
import Vector from "./Vector.js"
import Canvas from "../system/Canvas.js"

class Circle implements Drawable
{
    color: Color
    drawOrder: number
    size: number
    
    constructor(size: number, color: Color)
    {
        this.color = color
        this.size = size
    }

    public draw(): void
    {
        Canvas.canvasContext.fillStyle = this.color.toHex()
        Canvas.canvasContext.beginPath();
        Canvas.canvasContext.arc(0, 0, this.size, 0, 2 * Math.PI);
        Canvas.canvasContext.fill();
    }
}

export default Circle