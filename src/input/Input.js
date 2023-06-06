import Vector2 from "../types/Vector2.js";
class Input {
    static init() {
        const keyUpHandler = (event) => {
            Input.lastKeyUpKey = event.key;
        };
        const keyDownHandler = (event) => {
            Input.lastKeyDownKey = event.key;
        };
        const logMousePosition = (event) => {
            if (event)
                Input.lastMousePosition = new Vector2(event.clientX, event.clientY);
        };
        document.addEventListener('keyup', keyUpHandler, false);
        document.addEventListener('keydown', keyDownHandler, false);
        document.onmousemove = logMousePosition;
    }
    static resetInput() {
        Input.lastKeyUpKey = "";
        Input.lastKeyDownKey = "";
    }
    static getKeyDown(key) {
        return Input.lastKeyDownKey == key;
    }
    static getKeyUp(key) {
        return Input.lastKeyUpKey == key;
    }
    static getMousePosition() {
        if (this.lastMousePosition)
            return this.lastMousePosition;
        else
            return Vector2.zero();
    }
}
export default Input;
//# sourceMappingURL=Input.js.map