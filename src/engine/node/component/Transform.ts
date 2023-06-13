﻿import Vector from '../../math/Vector'
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
    public position: Vector
    public rotation: number
    public scale: Vector

    constructor(
        owner: Node,
        position: Vector = Vector.ZERO,
        rotation = 0,
        scale: Vector = Vector.ONE
    ) {
        super(owner)
        this.position = position
        this.rotation = rotation
        this.scale = scale
    }

    public _localToWorldMatrix(): Matrix {
        const translationMatrix = Matrix.translate(this.position.x, this.position.y)
        const rotationMatrix = Matrix.rotate(this.rotation)
        const scaleMatrix = Matrix.scale(this.scale.x, this.scale.y)

        let resultMatrix = translationMatrix
            .multiplyMatrix(rotationMatrix)
            .multiplyMatrix(scaleMatrix)

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
            this.position = Maths.lerpVector(x, tween._startValue, to)
        }

        const tween = new Tween<Vector>(evaluate, () => this.position, duration, delay, ease)
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
            this.position.x = Maths.lerpNumber(x, tween._startValue, to)
        }

        const tween = new Tween<number>(evaluate, () => this.position.x, duration, delay, ease)
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
            this.position.y = Maths.lerpNumber(x, tween._startValue, to)
        }

        const tween = new Tween<number>(evaluate, () => this.position.y, duration, delay, ease)
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
