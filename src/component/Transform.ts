import Vector2 from "../types/Vector2.js"
import ComponentType from "./ComponentType.js"
import Component from "./Component.js"
import Actor from "../actor/Actor.js"
import Tween from "../system/tween/Tween.js"
import Ease from "../system/tween/Ease.js"

class Transform extends Component
{
    // COMPONENT METADATA //
    public readonly type = ComponentType.TRANSFORM
    public readonly componentRequirements = []

    // COMPONENT PROPERTIES //
    public position: Vector2
    public rotation: number
    public scale: Vector2

    constructor(owner: Actor, position: Vector2 = Vector2.zero(), rotation: number = 0, scale: Vector2 = Vector2.one())
    {
        super(owner)
        this.position = position
        this.rotation = rotation
        this.scale = scale
    }

    public tweenPosition(to: Vector2, duration: number, delay: number, ease: Ease): Tween<Vector2>
    {
        const evaluate = (x: number) =>
        {
            this.position = (to.subtract(tween.startValue)).multiply(x).add(tween.startValue)
        }

        let tween = new Tween<Vector2>(evaluate, this.position, duration, delay, ease)

        return tween
    }
}

export default Transform