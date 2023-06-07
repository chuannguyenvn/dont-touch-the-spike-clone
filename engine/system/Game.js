import Debug from "./Debug.js";
import Input from "./Input.js";
import Canvas from "./Canvas.js";
import Physics from "./Physics.js";
import TweenEngine from "./tween/TweenEngine.js";
import Time from "./Time.js";
class Game {
    static init(canvasContext) {
        Debug.assert(!Game._isInitialized, "Game is already initialized.");
        Time._init();
        Input._init();
        Canvas._init(canvasContext);
        Game._lastFrameTimestamp = Date.now();
        window.requestAnimationFrame(Game._gameLoop);
    }
    ;
    static _gameLoop() {
        let currentTimestamp = Date.now();
        Time._lastFrameTime = Game._lastFrameTimestamp;
        Physics._handlePhysics();
        Game._update();
        TweenEngine._handleTween();
        Canvas._draw();
        Game._lastFrameTimestamp = currentTimestamp;
        Input._resetInput();
        window.requestAnimationFrame(Game._gameLoop);
    }
    ;
    static _update() {
        for (let i = 0; i < this._nodes.length; i++) {
            if (this._nodes[i].parentNode !== null)
                continue;
            this._nodes[i]._executeUpdate();
        }
    }
    ;
    static _registerUpdatable(node) {
        Game._nodes.push(node);
    }
    ;
}
Game._isInitialized = false;
Game._nodes = [];
Game._lastFrameTimestamp = -1;
export default Game;
//# sourceMappingURL=Game.js.map