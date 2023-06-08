import Color from "./Color"
import Vector from "./Vector"

interface Drawable
{
    drawOrder: number
    color: Color
    _draw(offSet: Vector): void
}

export default Drawable