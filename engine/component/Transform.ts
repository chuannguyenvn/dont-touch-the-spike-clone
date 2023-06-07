import Vector from "../types/Vector.js"
import ComponentType from "./ComponentType.js"
import Component from "./Component.js"
import Node from "../node/Node.js"
import Tween from "../system/tween/Tween.js"
import Ease from "../system/tween/Ease.js"
import Matrix from "../types/Matrix.js"

class Transform extends Component
{
    // COMPONENT METADATA //
    public readonly type = ComponentType.TRANSFORM
    public readonly _componentRequirements = []

    // COMPONENT PROPERTIES //
    public position: Vector
    public rotation: number
    public scale: Vector

    constructor(owner: Node, position: Vector = Vector.zero(), rotation: number = 0, scale: Vector = Vector.one())
    {
        super(owner)
        this.position = position
        this.rotation = rotation
        this.scale = scale
    }

    public _localToWorldMatrix(): Matrix
    {
        const translationMatrix = Matrix.translate(this.position.x, this.position.y)
        const rotationMatrix = Matrix.rotate(this.rotation)
        const scaleMatrix = Matrix.scale(this.scale.x, this.scale.y)

        return translationMatrix.multiplyMatrix(rotationMatrix).multiplyMatrix(scaleMatrix)
    }

    public tweenPosition(to: Vector, duration: number, delay: number, ease: Ease, relative: boolean): Tween<Vector>
    {
        const evaluate = (x: number) =>
        {
            if (relative) to.add(tween._startValue)
            this.position = (to.subtract(tween._startValue)).multiply(x).add(tween._startValue)
        }

        let tween = new Tween<Vector>(evaluate, () => this.position, duration, delay, ease)
        return tween
    }

    public tweenPositionX(to: number, duration: number, delay: number, ease: Ease, relative: boolean): Tween<number>
    {
        const evaluate = (x: number) =>
        {
            if (relative) to += tween._startValue
            this.position.x = (to - tween._startValue) * x + tween._startValue
        }

        let tween = new Tween<number>(evaluate, () => this.position.x, duration, delay, ease)
        return tween
    }

    public tweenPositionY(to: number, duration: number, delay: number, ease: Ease, relative: boolean): Tween<number>
    {
        const evaluate = (x: number) =>
        {
            if (relative) to += tween._startValue
            this.position.y = (to - tween._startValue) * x + tween._startValue
        }

        let tween = new Tween<number>(evaluate, () => this.position.y, duration, delay, ease)
        return tween
    }
}

export default Transform