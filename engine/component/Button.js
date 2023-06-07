import { GameEvent } from "../types/Event.js";
import { UIElement } from "./UIElement.js";
class Button extends UIElement {
    constructor(owner) {
        super(owner);
        this.clicked = new GameEvent();
        this.hovered = new GameEvent();
    }
}
export default Button;
//# sourceMappingURL=Button.js.map