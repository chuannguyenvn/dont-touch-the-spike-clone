﻿import Drawable from './Drawable'
import Canvas from '../system/Canvas'
import Color from '../math/Color'
import Vector from '../math/Vector'

class FreeformShape implements Drawable {
    public drawOrder: number
    public color: Color
    public _points: Vector[]
    public offSet: Vector = Vector.ZERO

    constructor(color: Color) {
        this.color = color
    }

    public _draw(): void {
        Canvas._canvasContext.fillStyle = this.color.toString()

        Canvas._canvasContext.beginPath()
        for (let i = 0; i < this._points.length; i++) {
            Canvas._canvasContext.lineTo(this._points[i].x, this._points[i].y)
        }
        Canvas._canvasContext.fill()
    }

    public setPoints(points: Vector[]) {
        this._points = points
    }
}

export default FreeformShape
