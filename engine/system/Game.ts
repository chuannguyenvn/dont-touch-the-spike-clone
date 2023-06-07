import Debug from "./Debug.js"
import Input from "./Input.js"
import Canvas from "./Canvas.js"
import Physics from "./Physics.js"
import TweenEngine from "./tween/TweenEngine.js"
import Time from "./Time.js"
import Node from "../node/Node"

class Game
{
    private static isInitialized: boolean = false
    private static nodes: Node[] = []
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
        for (let i = 0; i <this.nodes.length; i++)
        {
            if (this.nodes[i].parentNode !== null) continue
            this.nodes[i].executeUpdate()
        }
    };

    public static registerUpdatable(node: Node): void
    {
        Game.nodes.push(node)
    };
}

export default Game