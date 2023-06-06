import Vector2 from "../types/Type.js"
import ComponentType from "./ComponentType.js"
import Component from "./Component.js"

class Transform extends Component
{
    public position: Vector2
    public rotation: number
    public scale: Vector2

    constructor()
    {
        super(ComponentType.TRANSFORM)
    }
}

export default Transform