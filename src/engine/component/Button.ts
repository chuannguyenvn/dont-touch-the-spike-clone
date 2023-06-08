import {GameEvent} from "../types/Event"
import {UIElement} from "./UIElement"
import Node from "../node/Node"

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