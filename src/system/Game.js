import Debug from "./Debug.js";
import Input from "../input/Input.js";
class Game {
    static init(ctx) {
        Debug.assert(!Game.isInitialized, "Game is already initialized.");
        Game.canvasContext = ctx;
        Game.lastFrameTimestamp = Date.now();
        window.requestAnimationFrame(Game.gameLoop);
    }
    ;
    static gameLoop() {
        let currentTimestamp = Date.now();
        Game.update(currentTimestamp - Game.lastFrameTimestamp);
        Game.lastFrameTimestamp = currentTimestamp;
        Input.resetInput();
        window.requestAnimationFrame(Game.gameLoop);
    }
    ;
    static update(deltaTime) {
        Game.updatables.forEach(updatable => updatable.update(deltaTime));
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