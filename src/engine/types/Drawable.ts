import Color from "./Color.js"
import Vector from "./Vector.js"

interface Drawable
{
    drawOrder: number
    color: Color
    _draw(offSet: Vector): void
}

export default Drawable