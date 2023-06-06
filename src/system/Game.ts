import Updatable from "./Updatable.js"
import Debug from "./Debug.js"
import Input from "../input/Input.js"
import Canvas from "./Canvas.js"
import Physics from "./Physics.js"
import TweenEngine from "./tween/TweenEngine.js"
import Time from "./Time.js"

class Game
{
    private static isInitialized: boolean = false
    private static updatables: Updatable[] = []
    private static lastFrameTimestamp: number = -1

    public static init(): void
    {
        Debug.assert(!Game.isInitialized, "Game is already initialized.")

        Game.lastFrameTimestamp = Date.now()
        window.requestAnimationFrame(Game.gameLoop)
    };

    private static gameLoop(): void
    {
        let currentTimestamp = Date.now()
        Time.lastFrameTime = Game.lastFrameTimestamp

        Physics.handlePhysics()
        Game.update()
        TweenEngine.handleTween()
        Canvas.draw()

        Game.lastFrameTimestamp = currentTimestamp
        Input.resetInput()
        window.requestAnimationFrame(Game.gameLoop)
    };

    private static update(): void
    {
        Game.updatables.forEach(updatable => updatable.update())
    };

    public static registerUpdatable(updatable: Updatable): void
    {
        Game.updatables.push(updatable)
    };
}

export default Game