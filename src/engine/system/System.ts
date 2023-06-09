import Debug from "./Debug"
import Input from "./Input/Input"
import Canvas from "./Canvas/Canvas"
import Physics from "./Physics"
import TweenEngine from "./tween/TweenEngine"
import Time from "./Time"
import Node from "../node/Node"
import Game from "../Game"

abstract class System
{
    public static game: Game
    
    private static _isInitialized = false
    private static _nodes: Node[] = []
    private static _lastFrameTimestamp = -1

    public static _init(): void {
        Debug.assert(!System._isInitialized, "Game is already initialized.")
        
        System._lastFrameTimestamp = Date.now()
        window.requestAnimationFrame(System._gameLoop)
        Debug.log("Game is running.")
    }

    public static _registerNode(node: Node): void {
        System._nodes.push(node)
    }

    public static _unregisterNode(node: Node): void {
        System._nodes = System._nodes.filter((node) => node !== node)
    }

    private static _gameLoop(): void {
        const currentTimestamp = Date.now()
        Time._lastFrameTime = System._lastFrameTimestamp

        Input._handleInput()
        Physics._handlePhysics()
        System._update()
        TweenEngine._handleTween()
        Canvas._draw()

        System._lastFrameTimestamp = currentTimestamp
        Input._resetInput()
        window.requestAnimationFrame(System._gameLoop)
    }

    private static _update(): void {
        for (let i = 0; i < this._nodes.length; i++)
        {
            if (this._nodes[i].parentNode !== null || !this._nodes[i].isActive) continue
            this._nodes[i]._executeUpdate()
        }
    }
}

export default System