import Sprite from "../component/Sprite.js"
import Vector from "../types/Vector.js"
import Color from "../types/Color.js"

class Canvas
{
    private static canvasSize: Vector = new Vector(400, 600)
    private static sprites: Sprite[] = []
    public static canvasContext: CanvasRenderingContext2D
    public static backgroundColor: Color = Color.white()

    public static init(canvasContext: CanvasRenderingContext2D): void
    {
        Canvas.canvasContext = canvasContext
    }

    public static draw(): void
    {
        Canvas.canvasContext.clearRect(0, 0, Canvas.canvasSize.x, Canvas.canvasSize.y)

        for (let sprite of this.sprites)
        {
            sprite.draw()
        }
    }

    public static registerSprite(sprite: Sprite): void
    {
        this.sprites.push(sprite)
    }
}

export default Canvas