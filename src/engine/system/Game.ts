import Debug from "./Debug"
import Input from "./Input/Input"
import Canvas from "./Canvas/Canvas"
import Physics from "./Physics"
import TweenEngine from "./tween/TweenEngine"
import Time from "./Time"
import Node from "../node/Node"

abstract class Game
{
    private static _isInitialized = false
    private static _nodes: Node[] = []
    private static _lastFrameTimestamp = -1

    public static init(canvasContext: CanvasRenderingContext2D): void {
        Debug.assert(!Game._isInitialized, "Game is already initialized.")

        Time._init()
        Input._init()
        Canvas._init(canvasContext)
        Game._lastFrameTimestamp = Date.now()
        window.requestAnimationFrame(Game._gameLoop)
    }

    public static _registerNode(node: Node): void {
        Game._nodes.push(node)
    }

    public static _unregisterNode(node: Node): void {
        Game._nodes = Game._nodes.filter((node) => node !== node)
    }

    private static _gameLoop(): void {
        const currentTimestamp = Date.now()
        Time._lastFrameTime = Game._lastFrameTimestamp

        Input._handleInput()
        Physics._handlePhysics()
        Game._update()
        TweenEngine._handleTween()
        Canvas._draw()

        Game._lastFrameTimestamp = currentTimestamp
        Input._resetInput()
        window.requestAnimationFrame(Game._gameLoop)
    }

    private static _update(): void {
        for (let i = 0; i < this._nodes.length; i++)
        {
            if (this._nodes[i].parentNode !== null || !this._nodes[i].isActive) continue
            this._nodes[i]._executeUpdate()
        }
    }
}

export default Game