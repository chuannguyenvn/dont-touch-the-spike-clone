import Debug from "./Debug.js"
import Input from "./Input.js"
import Canvas from "./Canvas.js"
import Physics from "./Physics.js"
import TweenEngine from "./tween/TweenEngine.js"
import Time from "./Time.js"
import Node from "../node/Node.js"

abstract class Game
{
    private static _isInitialized: boolean = false
    private static _nodes: Node[] = []
    private static _lastFrameTimestamp: number = -1

    public static init(canvasContext: CanvasRenderingContext2D): void
    {
        Debug.assert(!Game._isInitialized, "Game is already initialized.")

        Time._init()
        Input._init()
        Canvas._init(canvasContext)
        Game._lastFrameTimestamp = Date.now()
        window.requestAnimationFrame(Game._gameLoop)
    };

    private static _gameLoop(): void
    {
        let currentTimestamp = Date.now()
        Time._lastFrameTime = Game._lastFrameTimestamp

        Physics._handlePhysics()
        Game._update()
        TweenEngine._handleTween()
        Canvas._draw()

        Game._lastFrameTimestamp = currentTimestamp
        Input._resetInput()
        window.requestAnimationFrame(Game._gameLoop)
    };

    private static _update(): void
    {
        for (let i = 0; i < this._nodes.length; i++)
        {
            if (this._nodes[i].parentNode !== null) continue
            this._nodes[i]._executeUpdate()
        }
    };

    public static _registerNode(node: Node): void
    {
        Game._nodes.push(node)
    };
}

export default Game