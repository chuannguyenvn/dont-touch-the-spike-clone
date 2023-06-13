import Renderer from '../../node/component/Renderer'
import Vector from '../../math/Vector'
import Color from '../../math/Color'
import Matrix from '../../math/Matrix'
import Debug from '../Debug'
import Time from '../Time'
import DrawLayer from '../../configs-and-resources/DrawLayers'
import DrawLayers from '../../configs-and-resources/DrawLayers'

class Canvas {
    public static _canvasContext: CanvasRenderingContext2D
    public static _worldToCameraMatrix: Matrix

    public static get canvasSize(): Vector {
        return this._canvasSize
    }

    private static _canvasSize: Vector = new Vector(400, 600)
    public static backgroundColor: Color = Color.WHITE
    private static _renderers: Map<DrawLayer, Renderer[]> = new Map<DrawLayer, Renderer[]>()

    public static _init(canvasContext: CanvasRenderingContext2D, canvasSize: Vector): void {
        Canvas._canvasContext = canvasContext
        this._canvasSize = canvasSize
        const translationMatrix = Matrix.translate(
            Canvas._canvasSize.x / 2,
            Canvas._canvasSize.y / 2
        )
        const scaleMatrix = Matrix.scale(1, -1)
        this._worldToCameraMatrix = translationMatrix.multiplyMatrix(scaleMatrix)

        for (const layer in DrawLayers) {
            Canvas._renderers.set(DrawLayer[layer as keyof typeof DrawLayer], [])
        }

        Debug.log('Canvas initialized.')
    }

    public static _draw(): void {
        Canvas._canvasContext.clearRect(0, 0, Canvas._canvasSize.x, Canvas._canvasSize.y)
        Canvas._canvasContext.fillStyle = Canvas.backgroundColor.toString()
        Canvas._canvasContext.fillRect(0, 0, Canvas._canvasSize.x, Canvas._canvasSize.y)

        for (const layer in DrawLayers) {
            const actualLayer = DrawLayer[layer as keyof typeof DrawLayer] as DrawLayer

            const renderersInLayerSorted: Renderer[] = (
                Canvas._renderers.get(actualLayer) as Renderer[]
            ).sort((a: Renderer, b: Renderer) => (a.drawOrder > b.drawOrder ? 1 : -1))

            for (let i = 0; i < renderersInLayerSorted.length; i++) {
                Canvas._drawRenderer(renderersInLayerSorted[i])
            }
        }

        if (Debug._showFps) {
            Canvas._canvasContext.font = '30px verdana'
            Canvas._canvasContext.textAlign = 'left'
            Canvas._canvasContext.fillStyle = Color.MAGENTA.toString()
            Canvas._canvasContext.fillText('FPS: ' + Math.round(1 / Time.deltaTime()), 50, 50)
        }
    }

    private static _drawRenderer(renderer: Renderer) {
        const localToWorld = renderer._localToWorldMatrix().multiplyMatrix(Matrix.scale(1, -1))
        const worldToCamera = Canvas._worldToCameraMatrix
        const res = worldToCamera.multiplyMatrix(localToWorld)

        Canvas._canvasContext.setTransform(
            res.values[0][0],
            res.values[1][0],
            res.values[0][1],
            res.values[1][1],
            res.values[0][2],
            res.values[1][2]
        )

        renderer._draw(Time.deltaTime())
        Canvas._canvasContext.resetTransform()
    }

    public static _registerRenderer(renderer: Renderer): void {
        this._renderers.get(renderer.drawLayer)?.push(renderer)
    }

    public static _unregisterRenderer(renderer: Renderer): void {
        this._renderers.set(
            renderer.drawLayer,
            (this._renderers.get(renderer.drawLayer) as Renderer[]).filter((r) => r !== renderer)
        )
    }
}

export default Canvas
