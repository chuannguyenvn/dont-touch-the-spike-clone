import Updatable from "./Updatable.js"
import Debug from "./Debug.js"

class Game
{
    private static isInitialized: boolean = false;
    private static updatables: Updatable[] = [];
    private static lastFrameTimestamp: number = -1;

    public static init(ctx: HTMLElement)
    {
        Debug.assert(!Game.isInitialized, "Game is already initialized.");
        
        Game.lastFrameTimestamp = Date.now();
        window.requestAnimationFrame(Game.gameLoop);
    };

    private static gameLoop()
    {
        let currentTimestamp = Date.now();
        Game.update(currentTimestamp - Game.lastFrameTimestamp);
        Game.lastFrameTimestamp = currentTimestamp;
        window.requestAnimationFrame(Game.gameLoop);
    };

    private static update(deltaTime: number)
    {
        Game.updatables.forEach(updatable => updatable.update(deltaTime));
    };

    public static registerUpdatable(updatable: Updatable)
    {
        Game.updatables.push(updatable);
    };
}

export default Game