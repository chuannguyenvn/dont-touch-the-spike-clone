import Component from "./Component.js"
import {GameEvent} from "../types/Event.js"
import {UIElement} from "./UIElement.js"
import Node from "../node/Node.js"

class Button extends UIElement
{
    public clicked: GameEvent = new GameEvent()
    public hovered: GameEvent = new GameEvent()
    
    constructor(owner: Node)
    {
        super(owner)
    }
}

export default Button