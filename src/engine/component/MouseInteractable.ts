﻿import Vector from '../math/Vector'
import Node from '../node/Node'

interface MouseInteractable {
    owner: Node

    _click(position: Vector): void
    _hover(position: Vector): void
}

export default MouseInteractable
