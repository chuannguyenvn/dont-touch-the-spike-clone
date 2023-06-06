import Debug from "./Debug.js";
import Input from "../input/Input.js";
import Canvas from "./Canvas.js";
import Physics from "./Physics.js";
class Game {
    static init() {
        Debug.assert(!Game.isInitialized, "Game is already initialized.");
        Game.lastFrameTimestamp = Date.now();
        window.requestAnimationFrame(Game.gameLoop);
    }
    ;
    static gameLoop() {
        let currentTimestamp = Date.now();
        Game.update((currentTimestamp - Game.lastFrameTimestamp) / 1000);
        Physics.handlePhysics();
        Canvas.draw();
        Game.lastFrameTimestamp = currentTimestamp;
        Input.resetInput();
        window.requestAnimationFrame(Game.gameLoop);
    }
    ;
    static update(secondsSinceLastFrame) {
        Game.updatables.forEach(updatable => updatable.update(secondsSinceLastFrame));
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