import {GameEvent} from "../types/Event"
import {UIElement} from "./UIElement"
import Node from "../node/Node"
import MouseInteractable from "./MouseInteractable"
import Vector from "../types/Vector"
import Input from "../system/Input"

class Button extends UIElement implements MouseInteractable
{
    public clicked: GameEvent = new GameEvent()
    public hovered: GameEvent = new GameEvent()

    constructor(owner: Node) {
        super(owner)
        Input.registerMouseInteractable(this)
    }

    _click(position: Vector): void {
        if (this.rect.isPointInside(position) && Input.getMouseDown()) this.clicked.invoke()
    }

    _hover(position: Vector): void {
        if (this.rect.isPointInside(position)) this.hovered.invoke()
    }
}

export default Button