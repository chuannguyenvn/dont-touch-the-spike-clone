class Input {
    static init() {
        const keyUpHandler = (event) => {
            Input.lastKeyUpKey = event.key;
        };
        const keyDownHandler = (event) => {
            Input.lastKeyDownKey = event.key;
        };
        document.addEventListener('keyup', keyUpHandler, false);
        document.addEventListener('keydown', keyDownHandler, false);
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
}
export default Input;
//# sourceMappingURL=Input.js.map