import Renderer from "../component/Renderer.js"
import Vector from "../types/Vector.js"
import Color from "../types/Color.js"
import Matrix from "../types/Matrix.js"

class Canvas
{
    private static canvasSize: Vector = new Vector(400, 600)
    private static sprites: Renderer[] = []
    public static canvasContext: CanvasRenderingContext2D
    public static backgroundColor: Color = Color.white()
    public static worldToCameraMatrix: Matrix

    public static init(canvasContext: CanvasRenderingContext2D): void
    {
        Canvas.canvasContext = canvasContext
        let translationMatrix = Matrix.translate(-Canvas.canvasSize.x / 4, Canvas.canvasSize.y / 4)
        let scaleMatrix = Matrix.scale(1, 1)
        this.worldToCameraMatrix = scaleMatrix.multiplyMatrix(translationMatrix)
    }

    public static draw(): void
    {
        Canvas.canvasContext.clearRect(0, 0, Canvas.canvasSize.x, Canvas.canvasSize.y)
        Canvas.canvasContext.fillStyle = 'white'
        Canvas.canvasContext.fillRect(0, 0, Canvas.canvasSize.x, Canvas.canvasSize.y)
        
        for (let sprite of this.sprites)
        {
            let localToWorld = sprite.localToWorldMatrix()
            let worldToCamera = Matrix.identity() // Canvas.worldToCameraMatrix
            let res = worldToCamera.multiplyMatrix(localToWorld)

            Canvas.canvasContext.setTransform(
                res.values[0][0], res.values[1][0], res.values[0][1],
                res.values[1][1], res.values[0][2], res.values[1][2])
            
            sprite.draw()
            Canvas.canvasContext.resetTransform()
        }
    }

    public static registerSprite(sprite: Renderer): void
    {
        this.sprites.push(sprite)
    }
}

export default Canvas