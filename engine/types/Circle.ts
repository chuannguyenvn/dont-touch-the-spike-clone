﻿import Drawable from "./Drawable.js"
import Color from "./Color.js"
import Vector from "./Vector.js"
import Canvas from "../system/Canvas.js"

class Circle implements Drawable
{
    public drawOrder: number
    public color: Color
    public size: number
    
    constructor(size: number, color: Color)
    {
        this.color = color
        this.size = size
    }

    public _draw(): void
    {
        Canvas._canvasContext.fillStyle = this.color.toHex()
        Canvas._canvasContext.beginPath();
        Canvas._canvasContext.arc(0, 0, this.size, 0, 2 * Math.PI);
        Canvas._canvasContext.fill();
    }
}

export default Circle