import { GameEvent } from '../../utility/Event'
import { UIElement } from './UIElement'
import Node from '../Node'
import MouseInteractable from './MouseInteractable'
import Vector from '../../math/Vector'
import Input from '../../system/Input'
import ComponentType from './ComponentType'

class UIButton extends UIElement implements MouseInteractable {
    // COMPONENT METADATA //
    public readonly type: ComponentType = ComponentType.BUTTON
    public readonly _componentRequirements: ComponentType[] = [ComponentType.TRANSFORM]

    // COMPONENT PROPERTIES //
    public _lastFrameHovered = false
    public clicked: GameEvent = new GameEvent()
    public hovered: GameEvent = new GameEvent()
    public unhovered: GameEvent = new GameEvent()

    constructor(owner: Node) {
        super(owner)
        Input.registerMouseInteractable(this)
    }

    _checkClick(position: Vector): void {
        if (this.rect.isPointInside(position) && Input.getMouseUp()) this.clicked.invoke()
    }

    _checkHover(position: Vector): void {
        if (this.rect.isPointInside(position)) {
            this.hovered.invoke()
            this._lastFrameHovered = true
        } else if (this._lastFrameHovered) {
            this._lastFrameHovered = false
            this.unhovered.invoke()
        }
    }
}

export default UIButton
