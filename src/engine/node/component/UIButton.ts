import { GameEvent } from '../../utility/Event'
import { UIElement } from './UIElement'
import Node from '../Node'
import MouseInteractable from './MouseInteractable'
import Vector from '../../math/Vector'
import Input from '../../system/Input'

class UIButton extends UIElement implements MouseInteractable {
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

export default UIButton
