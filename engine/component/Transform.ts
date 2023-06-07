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
    public readonly componentRequirements = []

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

    public localToWorldMatrix(): Matrix
    {
        const translationMatrix = new Matrix()
        translationMatrix.values[2][0] = this.position.x
        translationMatrix.values[2][1] = this.position.y

        const rotationMatrix = new Matrix()
        const cosTheta = Math.cos(this.rotation)
        const sinTheta = Math.sin(this.rotation)
        rotationMatrix.values[0][0] = cosTheta
        rotationMatrix.values[0][1] = -sinTheta
        rotationMatrix.values[1][0] = sinTheta
        rotationMatrix.values[1][1] = cosTheta

        const scaleMatrix = new Matrix()
        scaleMatrix.values[0][0] = this.scale.x
        scaleMatrix.values[1][1] = this.scale.y

        return translationMatrix.multiplyMatrix(rotationMatrix).multiplyMatrix(scaleMatrix)
    }


    public tweenPosition(to: Vector, duration: number, delay: number, ease: Ease): Tween<Vector>
    {
        const evaluate = (x: number) =>
        {
            this.position = (to.subtract(tween.startValue)).multiply(x).add(tween.startValue)
        }

        let tween = new Tween<Vector>(evaluate, () => this.position, duration, delay, ease)

        return tween
    }
}

export default Transform