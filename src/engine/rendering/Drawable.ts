import Color from '../math/Color'
import Vector from '../math/Vector'

interface Drawable {
    drawOrder: number
    color: Color
    offSet: Vector

    _draw(): void
}

export default Drawable
