import Drawable from './Drawable'
import Canvas from '../system/Canvas'
import Color from '../math/Color'
import Vector from '../math/Vector'

class RectangleShape implements Drawable {
    public drawOrder: number
    public color: Color
    public size: Vector
    public offSet: Vector = Vector.ZERO

    constructor(size: Vector, color: Color) {
        this.color = color
        this.size = size
        this.offSet = new Vector(-this.size.x / 2, -this.size.y / 2)
    }

    public _draw(): void {
        Canvas._canvasContext.fillStyle = this.color.toString()
        Canvas._canvasContext.fillRect(this.offSet.x, this.offSet.y, this.size.x, this.size.y)
    }
}

export default RectangleShape
