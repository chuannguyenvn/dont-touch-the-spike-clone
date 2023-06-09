import Renderer from "../component/Renderer"
import Vector from "../types/Vector"
import Color from "../types/Color"
import Matrix from "../types/Matrix"

class Canvas
{
    public static _canvasContext: CanvasRenderingContext2D
    public static _worldToCameraMatrix: Matrix
    public static canvasSize: Vector = new Vector(400, 600)
    public static backgroundColor: Color = Color.WHITE
    private static _renderers: Renderer[] = []

    public static _init(canvasContext: CanvasRenderingContext2D): void {
        Canvas._canvasContext = canvasContext
        const translationMatrix = Matrix.translate(Canvas.canvasSize.x / 2, Canvas.canvasSize.y / 2)
        const scaleMatrix = Matrix.scale(1, -1)
        this._worldToCameraMatrix = translationMatrix.multiplyMatrix(scaleMatrix)
    }

    public static _draw(): void {
        Canvas._canvasContext.clearRect(0, 0, Canvas.canvasSize.x, Canvas.canvasSize.y)
        Canvas._canvasContext.fillStyle = Canvas.backgroundColor.toString()
        Canvas._canvasContext.fillRect(0, 0, Canvas.canvasSize.x, Canvas.canvasSize.y)

        this._renderers = this._renderers.sort((a, b) => a.drawOrder > b.drawOrder ? 1 : -1)

        for (const renderer of this._renderers)
        {
            const localToWorld = renderer._localToWorldMatrix().multiplyMatrix(Matrix.scale(1, -1))
            const worldToCamera = Canvas._worldToCameraMatrix
            const res = worldToCamera.multiplyMatrix(localToWorld)

            Canvas._canvasContext.setTransform(
                res.values[0][0], res.values[1][0], res.values[0][1],
                res.values[1][1], res.values[0][2], res.values[1][2])

            renderer._draw()
            Canvas._canvasContext.resetTransform()
        }
    }

    public static _registerRenderer(sprite: Renderer): void {
        this._renderers.push(sprite)
    }
}

export default Canvas