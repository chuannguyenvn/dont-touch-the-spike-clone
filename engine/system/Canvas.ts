﻿import Renderer from "../component/Renderer.js"
import Vector from "../types/Vector.js"
import Color from "../types/Color.js"
import Matrix from "../types/Matrix.js"

class Canvas
{
    private static _sprites: Renderer[] = []
    public static _canvasContext: CanvasRenderingContext2D
    public static _worldToCameraMatrix: Matrix
    
    public static canvasSize: Vector = new Vector(400, 600)
    public static backgroundColor: Color = Color.white()

    public static _init(canvasContext: CanvasRenderingContext2D): void
    {
        Canvas._canvasContext = canvasContext
        let translationMatrix = Matrix.translate(-Canvas.canvasSize.x / 4, Canvas.canvasSize.y / 4)
        let scaleMatrix = Matrix.scale(1, 1)
        this._worldToCameraMatrix = scaleMatrix.multiplyMatrix(translationMatrix)
    }

    public static _draw(): void
    {
        Canvas._canvasContext.clearRect(0, 0, Canvas.canvasSize.x, Canvas.canvasSize.y)
        Canvas._canvasContext.fillStyle = 'white'
        Canvas._canvasContext.fillRect(0, 0, Canvas.canvasSize.x, Canvas.canvasSize.y)

        for (let sprite of this._sprites)
        {
            let localToWorld = sprite._localToWorldMatrix()
            let worldToCamera = Matrix.identity() // Canvas.worldToCameraMatrix
            let res = worldToCamera.multiplyMatrix(localToWorld)

            Canvas._canvasContext.setTransform(
                res.values[0][0], res.values[1][0], res.values[0][1],
                res.values[1][1], res.values[0][2], res.values[1][2])

            sprite.draw()
            Canvas._canvasContext.resetTransform()
        }
    }

    public static _registerSprite(sprite: Renderer): void
    {
        this._sprites.push(sprite)
    }
}

export default Canvas