import Updatable from "./Updatable.js"
import Debug from "./Debug.js"
import Input from "./input/Input.js"

class Game
{
    public static canvasContext: HTMLElement
    private static isInitialized: boolean = false
    private static updatables: Updatable[] = []
    private static lastFrameTimestamp: number = -1

    public static init(ctx: HTMLElement)
    {
        Debug.assert(!Game.isInitialized, "Game is already initialized.")

        Game.canvasContext = ctx
        Game.lastFrameTimestamp = Date.now()
        window.requestAnimationFrame(Game.gameLoop)
    };

    private static gameLoop()
    {
        let currentTimestamp = Date.now()

        Game.update(currentTimestamp - Game.lastFrameTimestamp)
        Game.lastFrameTimestamp = currentTimestamp
        Input.resetInput()

        window.requestAnimationFrame(Game.gameLoop)
    };

    private static update(deltaTime: number)
    {
        Game.updatables.forEach(updatable => updatable.update(deltaTime))
    };

    public static registerUpdatable(updatable: Updatable)
    {
        Game.updatables.push(updatable)
    };
}

export default Game