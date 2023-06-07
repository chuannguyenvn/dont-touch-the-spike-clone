﻿import Collider from "../component/Collider.js"
import RectangleCollider from "../component/RectangleCollider.js"
import CircleCollider from "../component/CircleCollider.js"
import Vector from "../types/Vector.js"

class Physics
{
    private static _colliders: Collider[] = []

    public static _registerCollider(collider: Collider)
    {
        this._colliders.push(collider)
    }

    public static _handlePhysics()
    {
        for (let i = 0; i < this._colliders.length; i++)
        {
            for (let j = i + 1; j < this._colliders.length; j++)
            {
                if (this._colliders[i] instanceof RectangleCollider)
                {
                    let collider1 = this._colliders[i] as RectangleCollider

                    if (this._colliders[j] instanceof RectangleCollider)
                    {
                        let collider2 = this._colliders[j] as RectangleCollider
                        
                        let pos1 = collider1._getWorldPosition()
                        let pos2 = collider2._getWorldPosition()
                        let size1 = collider1.size
                        let size2 = collider2.size
                        if (Math.abs(pos1.subtract(pos2).x) < size1.x / 2 + size2.x / 2 &&
                            Math.abs(pos1.subtract(pos2).y) < size1.y / 2 + size2.y / 2)
                        {
                            Physics._broadcastCollision(collider1, collider2)
                        }
                    }
                    else if (this._colliders[j] instanceof CircleCollider)
                    {
                        let collider2 = this._colliders[j] as CircleCollider

                    }
                }
                else if (this._colliders[i] instanceof CircleCollider)
                {
                    let collider1 = this._colliders[i] as CircleCollider

                    if (this._colliders[j] instanceof RectangleCollider)
                    {
                        let collider2 = this._colliders[j] as RectangleCollider

                    }
                    else if (this._colliders[j] instanceof CircleCollider)
                    {
                        let collider2 = this._colliders[j] as CircleCollider

                        let pos1 = collider1._getWorldPosition()
                        let pos2 = collider2._getWorldPosition()
                        let size1 = collider1.size
                        let size2 = collider2.size
                        if (Vector.distance(pos1, pos2) > size1 + size2)
                        {
                            Physics._broadcastCollision(collider1, collider2)
                        }
                    }
                }
            }
        }
    }

    private static _broadcastCollision(collider1: Collider, collider2: Collider): void
    {
        collider1._addCollidingCollider(collider2)
        collider2._addCollidingCollider(collider1)
    }
}

export default Physics