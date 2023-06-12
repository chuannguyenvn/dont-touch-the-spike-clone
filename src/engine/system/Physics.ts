import Collider from '../node/component/Collider'
import RectangleCollider from '../node/component/RectangleCollider'
import CircleCollider from '../node/component/CircleCollider'
import Vector from '../math/Vector'
import Rigidbody from '../node/component/Rigidbody'
import Time from './Time'

class Physics {
    public static gravity: Vector = new Vector(0, -9.8)
    public static positionScale: Vector = new Vector(10, 10)
    
    private static _colliders: Collider[] = []
    private static _rigidbodies: Rigidbody[] = []

    public static _registerCollider(collider: Collider): void {
        this._colliders.push(collider)
    }

    public static _registerRigidbody(rigidbody: Rigidbody): void {
        this._rigidbodies.push(rigidbody)
    }

    public static _handlePhysics(): void {
        Physics._handleRigidbodies()
        // Physics._handleColliders()
    }

    private static _handleRigidbodies(): void {
        Physics._applyGravity()
        Physics._updatePosition(Time.deltaTime())
    }

    private static _updatePosition(physicDeltaTime: number): void {
        for (let i = 0; i < Physics._rigidbodies.length; i++) {
            Physics._rigidbodies[i]._updatePosition(physicDeltaTime)
        }
    }

    private static _applyGravity(): void {
        for (let i = 0; i < Physics._rigidbodies.length; i++) {
            Physics._rigidbodies[i].accelerate(Physics.gravity)
        }
    }
    
    private static solveCollision(): void{
        for (let i = 0; i < this._rigidbodies.length; i++)
        {
            const rigidbody1 = this._rigidbodies[i]
            for (let j = i + 1; j < this._rigidbodies.length; j++)
            {
                const rigidbody2 = this._rigidbodies[j]
                
                
            }
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
                        const size1 = collider1.size
                        const size2 = collider2.size
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
