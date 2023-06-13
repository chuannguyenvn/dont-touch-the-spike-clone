import Collider from '../node/component/Collider'
import RectangleCollider from '../node/component/RectangleCollider'
import CircleCollider from '../node/component/CircleCollider'
import Vector from '../math/Vector'
import Rigidbody from '../node/component/Rigidbody'
import Time from './Time'
import ComponentType from '../node/component/ComponentType'
import CollisionLayers from '../configs-and-resources/CollisionLayers'
import Matrix from '../math/Matrix'

class Physics {
    public static gravity: Vector = new Vector(0, -9.8)
    public static positionScale: number = 10
    public static substep: number = 4
    public static constraintRadius: number = 300

    private static _colliders: Collider[] = []
    private static _rigidbodies: Rigidbody[] = []

    public static _registerCollider(collider: Collider): void {
        this._colliders.push(collider)
    }

    public static _registerRigidbody(rigidbody: Rigidbody): void {
        this._colliders = this._colliders.filter(
            (collider) => collider.owner.getGuid() !== rigidbody.owner.getGuid()
        )
        this._rigidbodies.push(rigidbody)
    }

    public static _handlePhysics(): void {
        Physics._handleRigidbodies()
        // Physics._handleColliders()
    }

    private static _handleRigidbodies(): void {
        for (let i = 0; i < Physics.substep; i++) {
            const subDeltaTime = Time.deltaTime() / Physics.substep
            Physics._applyGravity()
            Physics._solveCollision(subDeltaTime)
            Physics._applyConstraint()
            Physics._updatePosition(subDeltaTime)
        }
    }

    private static _updatePosition(physicDeltaTime: number): void {
        for (let i = 0; i < Physics._rigidbodies.length; i++) {
            if (!Physics._rigidbodies[i].isActive || !Physics._rigidbodies[i].owner.isActive)
                continue
            Physics._rigidbodies[i]._updatePosition(physicDeltaTime)
        }
    }

    private static _applyGravity(): void {
        for (let i = 0; i < Physics._rigidbodies.length; i++) {
            if (!Physics._rigidbodies[i].isActive || !Physics._rigidbodies[i].owner.isActive)
                continue
            Physics._rigidbodies[i].accelerate(Physics.gravity)
        }
    }

    private static _solveCollision(deltaTime: number): void {
        for (let i = 0; i < Physics._rigidbodies.length; i++) {
            if (!Physics._rigidbodies[i].isActive || !Physics._rigidbodies[i].owner.isActive)
                continue

            const rigidbody1 = Physics._rigidbodies[i]
            if (rigidbody1.collisionLayer === CollisionLayers.IGNORE) continue

            // Rigidbody - rigidbody solution
            for (let j = i + 1; j < Physics._rigidbodies.length; j++) {
                if (!Physics._rigidbodies[j].isActive || !Physics._rigidbodies[j].owner.isActive)
                    continue

                const rigidbody2 = Physics._rigidbodies[j]
                if (rigidbody1.collisionLayer !== rigidbody2.collisionLayer) continue

                const circleCollider1 = rigidbody1.owner.getComponent(
                    ComponentType.CIRCLE_COLLIDER
                ) as CircleCollider
                const circleCollider2 = rigidbody2.owner.getComponent(
                    ComponentType.CIRCLE_COLLIDER
                ) as CircleCollider

                const position1 = circleCollider1._ownerTransform.position.copy()
                const position2 = circleCollider2._ownerTransform.position.copy()
                const distance = Vector.distance(position1, position2)
                const minDistance =
                    circleCollider1.radius * circleCollider1._ownerTransform.scale.x +
                    circleCollider2.radius * circleCollider2._ownerTransform.scale.x

                if (distance > minDistance) continue

                const axis = position1.subtract(position2).normalized()
                const massRatio1 = rigidbody1.mass / (rigidbody1.mass + rigidbody2.mass)
                const massRatio2 = rigidbody2.mass / (rigidbody1.mass + rigidbody2.mass)
                const responseCoef = (minDistance - distance) * 0.5

                circleCollider1._ownerTransform.position = position1.add(
                    axis.multiply(massRatio2 * responseCoef)
                )
                circleCollider2._ownerTransform.position = position2.subtract(
                    axis.multiply(massRatio1 * responseCoef)
                )

                this._broadcastCollision(circleCollider1, circleCollider2)
            }

            // Rigidbody - collider solution
            for (let j = 0; j < Physics._colliders.length; j++) {
                if (Physics._colliders[j].type === ComponentType.CIRCLE_COLLIDER) {
                    const circleCollider1 = rigidbody1.owner.getComponent(
                        ComponentType.CIRCLE_COLLIDER
                    ) as CircleCollider
                    const circleCollider2 = Physics._colliders[j] as CircleCollider

                    const position1 = circleCollider1._ownerTransform.position.copy()
                    const position2 = circleCollider2._ownerTransform.position.copy()
                    const distance = Vector.distance(position1, position2)
                    const minDistance =
                        circleCollider1.radius * circleCollider1._ownerTransform.scale.x +
                        circleCollider2.radius * circleCollider2._ownerTransform.scale.x

                    if (distance > minDistance) continue

                    const axis = position1.subtract(position2).normalized()

                    const responseCoef = (minDistance - distance) * 0.5

                    circleCollider1._ownerTransform.position = position1.add(
                        axis.multiply(responseCoef)
                    )

                    this._broadcastCollision(circleCollider1, circleCollider2)
                } else if (Physics._colliders[j].type === ComponentType.RECTANGLE_COLLIDER) {
                    const circleCollider = rigidbody1.owner.getComponent(
                        ComponentType.CIRCLE_COLLIDER
                    ) as CircleCollider
                    const rectangleCollider = Physics._colliders[j] as RectangleCollider

                    const circlePosition = circleCollider._ownerTransform.position.copy()
                    const rectanglePosition = rectangleCollider._ownerTransform.position.copy()

                    const rectangleRotation = rectangleCollider._ownerTransform.rotation
                    const circlePositionRelative = Matrix.rotate(-rectangleRotation).multiplyVector(
                        circlePosition.subtract(rectanglePosition)
                    )

                    const xDiff =
                        Math.abs(circlePositionRelative.x) -
                        circleCollider.radius -
                        rectangleCollider.size.x / 2
                    const yDiff =
                        Math.abs(circlePositionRelative.y) -
                        circleCollider.radius -
                        rectangleCollider.size.y / 2

                    if (xDiff >= 0 || yDiff >= 0) continue

                    let axis = Vector.ZERO
                    let responseCoef = 0
                    if (xDiff < yDiff) {
                        axis = circlePositionRelative.y > 0 ? Vector.UP : Vector.DOWN
                        responseCoef = Math.abs(yDiff)
                    } else {
                        axis = circlePositionRelative.x > 0 ? Vector.RIGHT : Vector.LEFT
                        responseCoef = Math.abs(xDiff)
                    }

                    axis = Matrix.rotate(rectangleRotation).multiplyVector(axis)
                    
                    circleCollider._ownerTransform.position = circlePosition.add(
                        axis.multiply(responseCoef)
                    )

                    this._broadcastCollision(circleCollider, rectangleCollider)
                }
            }
        }
    }

    private static _applyConstraint(): void {
        for (let i = 0; i < Physics._rigidbodies.length; i++) {
            if (!Physics._rigidbodies[i].isActive || !Physics._rigidbodies[i].owner.isActive)
                continue

            const position = Physics._rigidbodies[i].ownerTransform.position.copy()
            const radius = (
                Physics._rigidbodies[i].owner.getComponent(
                    ComponentType.CIRCLE_COLLIDER
                ) as CircleCollider
            ).radius

            if (position.length() + radius <= Physics.constraintRadius) continue

            Physics._rigidbodies[i].ownerTransform.position = position
                .normalized()
                .multiply(Physics.constraintRadius - radius)
        }
    }

    private static _handleColliders(): void {
        for (let i = 0; i < this._colliders.length; i++) {
            for (let j = i + 1; j < this._colliders.length; j++) {
                if (!this._colliders[i].isActive || !this._colliders[i].owner.isActive) continue
                if (!this._colliders[j].isActive || !this._colliders[j].owner.isActive) continue

                if (this._colliders[i] instanceof RectangleCollider) {
                    const collider1 = this._colliders[i] as RectangleCollider

                    if (this._colliders[j] instanceof RectangleCollider) {
                        const collider2 = this._colliders[j] as RectangleCollider

                        const pos1 = collider1._getWorldPosition()
                        const pos2 = collider2._getWorldPosition()
                        const size1 = collider1.size
                        const size2 = collider2.size
                        if (
                            Math.abs(pos1.subtract(pos2).x) < size1.x / 2 + size2.x / 2 &&
                            Math.abs(pos1.subtract(pos2).y) < size1.y / 2 + size2.y / 2
                        ) {
                            Physics._broadcastCollision(collider1, collider2)
                        }
                    } else if (this._colliders[j] instanceof CircleCollider) {
                        const collider2 = this._colliders[j] as CircleCollider
                    }
                } else if (this._colliders[i] instanceof CircleCollider) {
                    const collider1 = this._colliders[i] as CircleCollider

                    if (this._colliders[j] instanceof RectangleCollider) {
                        const collider2 = this._colliders[j] as RectangleCollider
                    } else if (this._colliders[j] instanceof CircleCollider) {
                        const collider2 = this._colliders[j] as CircleCollider

                        const pos1 = collider1._getWorldPosition()
                        const pos2 = collider2._getWorldPosition()
                        const size1 = collider1.radius
                        const size2 = collider2.radius
                        if (Vector.distance(pos1, pos2) > size1 + size2) {
                            Physics._broadcastCollision(collider1, collider2)
                        }
                    }
                }
            }
        }
    }

    private static _broadcastCollision(collider1: Collider, collider2: Collider): void {
        collider1._addCollidingCollider(collider2)
        collider2._addCollidingCollider(collider1)
    }
}

export default Physics
