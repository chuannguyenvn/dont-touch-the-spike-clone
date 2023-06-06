import Updatable from "./Updatable.js"
import Debug from "./Debug.js"
import Input from "../input/Input.js"
import Canvas from "./Canvas.js"
import Physics from "./Physics.js"

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

        Game.update((currentTimestamp - Game.lastFrameTimestamp) / 1000)
        Physics.handlePhysics()
        Canvas.draw()

        Game.lastFrameTimestamp = currentTimestamp
        Input.resetInput()
        window.requestAnimationFrame(Game.gameLoop)
    };

    private static update(secondsSinceLastFrame: number): void
    {
        Game.updatables.forEach(updatable => updatable.update(secondsSinceLastFrame))
    };

    public static registerUpdatable(updatable: Updatable): void
    {
        Game.updatables.push(updatable)
    };
}

export default Game