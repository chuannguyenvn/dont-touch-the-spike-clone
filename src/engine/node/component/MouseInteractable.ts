import Vector from '../../math/Vector'
import Node from '../Node'

interface MouseInteractable {
    owner: Node

    _checkClick(position: Vector): void

    _checkHover(position: Vector): void
}

export default MouseInteractable
