import Vector from '../../math/Vector'
import ComponentType from './ComponentType'
import Component from './Component'
import Node from '../Node'
import Tween from '../../system/tween/Tween'
import Ease from '../../system/tween/Ease'
import Matrix from '../../math/Matrix'
import Maths from '../../math/Maths'

class Transform extends Component {
    // COMPONENT METADATA //
    public readonly type: ComponentType = ComponentType.TRANSFORM
    public readonly _componentRequirements: ComponentType[] = []

    // COMPONENT PROPERTIES //
    private _localPosition: Vector = Vector.ZERO

    get localPosition(): Vector {
        return this._localPosition
    }

    set localPosition(value: Vector) {
        this._localPosition = value
    }

    get globalPosition(): Vector {
        const ctm = this._localToWorldMatrix()
        return new Vector(ctm.values[0][2], ctm.values[1][2])
    }

    set globalPosition(value: Vector) {
        this._localPosition = this._localToWorldMatrix(true).inverse().multiplyVector(value)
    }

    public rotation: number = 0
    public scale: Vector = Vector.ONE

    constructor(owner: Node) {
        super(owner)
    }

    public _localToWorldMatrix(excludeChild: boolean = false): Matrix {
        const translationMatrix = Matrix.translate(this._localPosition.x, this._localPosition.y)
        const rotationMatrix = Matrix.rotate(this.rotation)
        const scaleMatrix = Matrix.scale(this.scale.x, this.scale.y)

        let resultMatrix = translationMatrix
            .multiplyMatrix(rotationMatrix)
            .multiplyMatrix(scaleMatrix)

        if (excludeChild) resultMatrix = Matrix.IDENTITY

        if (this.owner.parentNode) {
            let node: Node | null = this.owner.parentNode
            while (node) {
                if (node.hasComponent(ComponentType.TRANSFORM)) {
                    const nodeTransform = node.getComponent(ComponentType.TRANSFORM) as Transform
                    resultMatrix = nodeTransform._localToWorldMatrix().multiplyMatrix(resultMatrix)
                }

                node = node.parentNode
            }
        }

        return resultMatrix
    }

    public tweenPosition(
        to: Vector,
        duration: number,
        delay: number,
        ease: Ease,
        relative: boolean,
        callback: (() => void) | undefined = undefined
    ): Tween<Vector> {
        const evaluate = (x: number) => {
            if (relative) to.add(tween._startValue)
            this.globalPosition = Maths.lerpVector(x, tween._startValue, to)
        }

        const tween = new Tween<Vector>(evaluate, () => this.globalPosition, duration, delay, ease)
        if (callback) tween._callback = callback
        return tween
    }

    public tweenPositionX(
        to: number,
        duration: number,
        delay: number,
        ease: Ease,
        relative: boolean,
        callback: (() => void) | undefined = undefined
    ): Tween<number> {
        const evaluate = (x: number) => {
            if (relative) to += tween._startValue
            this.globalPosition = this.globalPosition.withX(
                Maths.lerpNumber(x, tween._startValue, to)
            )
        }

        const tween = new Tween<number>(
            evaluate,
            () => this.globalPosition.x,
            duration,
            delay,
            ease
        )
        return tween
    }

    public tweenPositionY(
        to: number,
        duration: number,
        delay: number,
        ease: Ease,
        relative: boolean,
        callback: (() => void) | undefined = undefined
    ): Tween<number> {
        const evaluate = (x: number) => {
            if (relative) to += tween._startValue
            this.globalPosition = this.globalPosition.withY(
                Maths.lerpNumber(x, tween._startValue, to)
            )
        }

        const tween = new Tween<number>(
            evaluate,
            () => this.globalPosition.y,
            duration,
            delay,
            ease
        )
        if (callback) tween._callback = callback
        return tween
    }

    public tweenScale(
        to: Vector,
        duration: number,
        delay: number,
        ease: Ease,
        relative: boolean,
        callback: (() => void) | undefined = undefined
    ): Tween<Vector> {
        const evaluate = (x: number) => {
            if (relative) to.add(tween._startValue)
            this.scale = Maths.lerpVector(x, tween._startValue, to)
        }

        const tween = new Tween<Vector>(evaluate, () => this.scale, duration, delay, ease)
        if (callback) tween._callback = callback
        return tween
    }
}

export default Transform
