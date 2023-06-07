import Color from "./Color.js"

interface Drawable
{
    drawOrder: number
    color: Color
    _draw(): void
}

export default Drawable