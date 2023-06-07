import Vector from "../types/Vector.js";
import Canvas from "./Canvas.js";
class Input {
    static _init() {
        const keyUpHandler = (event) => {
            Input._lastKeyUpKey = event.key;
        };
        const keyDownHandler = (event) => {
            Input._lastKeyDownKey = event.key;
        };
        const logMousePosition = (event) => {
            if (event)
                Input._lastMousePosition = new Vector(event.clientX, event.clientY, 1);
        };
        document.addEventListener('keyup', keyUpHandler, false);
        document.addEventListener('keydown', keyDownHandler, false);
        document.onmousemove = logMousePosition;
    }
    static _resetInput() {
        Input._lastKeyUpKey = "";
        Input._lastKeyDownKey = "";
    }
    static getKeyDown(key) {
        return Input._lastKeyDownKey == key;
    }
    static getKeyUp(key) {
        return Input._lastKeyUpKey == key;
    }
    static getMousePosition() {
        if (this._lastMousePosition)
            return Canvas._worldToCameraMatrix.inverse().multiplyVector(this._lastMousePosition);
        else
            return Vector.zero();
    }
}
export default Input;
//# sourceMappingURL=Input.js.map