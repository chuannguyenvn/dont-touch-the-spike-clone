import Drawable from './Drawable'
import Color from '../math/Color'
import Vector from '../math/Vector'
import Canvas from '../system/Canvas'

class LineShape implements Drawable {
    public drawOrder: number
    public color: Color
    public width: number
    public offSet: Vector
    public path: Vector[]

    constructor(path: Vector[], color: Color, width: number) {
        this.path = path
        this.color = color
        this.width = width
    }

    public _draw(): void {
        Canvas._canvasContext.strokeStyle = this.color.toString()
        Canvas._canvasContext.lineWidth = this.width

        Canvas._canvasContext.beginPath()
        Canvas._canvasContext.moveTo(this.path[0].x, this.path[0].y)
        for (let i = 1; i < this.path.length; i++) {
            Canvas._canvasContext.lineTo(this.path[i].x, this.path[i].y)
        }
        Canvas._canvasContext.stroke()
    }
}

export default LineShape
