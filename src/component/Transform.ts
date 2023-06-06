import Vector2 from "../types/Vector2.js"
import ComponentType from "./ComponentType.js"
import Component from "./Component.js"
import vector2 from "../types/Vector2.js"

class Transform extends Component
{
    // COMPONENT METADATA //
    public readonly type = ComponentType.TRANSFORM
    public readonly componentRequirements = []

    // COMPONENT PROPERTIES //
    public position: Vector2
    public rotation: number
    public scale: Vector2

    constructor(position: Vector2 = Vector2.zero(), rotation: number = 0, scale: Vector2 = vector2.one())
    {
        super()
        this.position = position
        this.rotation = rotation
        this.scale = scale
    }
}

export default Transform