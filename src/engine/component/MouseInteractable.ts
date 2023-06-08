import Vector from "../types/Vector"

interface MouseInteractable
{
    _click(position: Vector): void
    _hover(position: Vector): void
}

export default MouseInteractable