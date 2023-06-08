import Color from "./Color"
import Vector from "./Vector"

interface Drawable
{
    drawOrder: number
    color: Color
    offSet: Vector

    _draw(): void
}

export default Drawable