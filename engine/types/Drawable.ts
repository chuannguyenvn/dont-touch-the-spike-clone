import Color from "./Color.js"

interface Drawable
{
    drawOrder: number
    color: Color
    draw(): void
}

export default Drawable