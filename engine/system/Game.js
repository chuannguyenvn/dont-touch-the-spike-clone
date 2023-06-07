import Debug from "./Debug.js";
import Input from "./Input.js";
import Canvas from "./Canvas.js";
import Physics from "./Physics.js";
import TweenEngine from "./tween/TweenEngine.js";
import Time from "./Time.js";
class Game {
    static init() {
        Debug.assert(!Game.isInitialized, "Game is already initialized.");
        Game.lastFrameTimestamp = Date.now();
        window.requestAnimationFrame(Game.gameLoop);
    }
    ;
    static gameLoop() {
        let currentTimestamp = Date.now();
        Time.lastFrameTime = Game.lastFrameTimestamp;
        Physics.handlePhysics();
        Game.update();
        TweenEngine.handleTween();
        Canvas.draw();
        Game.lastFrameTimestamp = currentTimestamp;
        Input.resetInput();
        window.requestAnimationFrame(Game.gameLoop);
    }
    ;
    static update() {
        Game.updatables.forEach(updatable => updatable.update());
    }
    ;
    static registerUpdatable(updatable) {
        Game.updatables.push(updatable);
    }
    ;
}
Game.isInitialized = false;
Game.updatables = [];
Game.lastFrameTimestamp = -1;
export default Game;
//# sourceMappingURL=Game.js.map