import Debug from './Debug'
import Input from './Input'
import Canvas from './Canvas'
import Physics from './Physics'
import TweenEngine from '../utility/tween/TweenEngine'
import Time from './Time'
import Node from '../node/Node'
import Game from '../Game'

abstract class System {
    public static game: Game

    private static _isInitialized = false
    private static _rootNodes: Node[] = []
    private static _lastFrameTimestamp = -1

    public static _init(): void {
        Debug.assert(!System._isInitialized, 'Game is already initialized.')

        System._lastFrameTimestamp = performance.now()
        window.requestAnimationFrame(System._gameLoop)
        Debug.log('Game is running.')
    }

    public static _registerRootNode(node: Node): void {
        System._rootNodes.push(node)
    }

    public static _unregisterRootNode(node: Node): void {
        System._rootNodes = System._rootNodes.filter((n) => n !== node)
    }

    private static _gameLoop(): void {
        const currentTimestamp = performance.now()
        Time._lastFrameTime = System._lastFrameTimestamp

        Input._handleInput()
        Physics._handlePhysics()
        Time._handleTimer()
        System._update()
        TweenEngine._handleTween()
        Canvas._draw()

        System._lastFrameTimestamp = currentTimestamp
        Input._resetInput()
        window.requestAnimationFrame(System._gameLoop)
    }

    private static _update(): void {
        for (let i = 0; i < this._rootNodes.length; i++) {
            if (this._rootNodes[i].parentNode !== null || !this._rootNodes[i].isActive) continue
            this._rootNodes[i]._executeUpdate()
        }
    }
}

export default System
