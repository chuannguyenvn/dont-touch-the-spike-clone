﻿import Component from './Component'
import ComponentType from './ComponentType'
import Node from '../Node'
import Transform from './Transform'
import Physics from '../../system/Physics'
import Vector from '../../math/Vector'
import Time from "../../system/Time"
import CollisionLayer from "../../config/CollisionLayers"
import CollisionLayers from "../../config/CollisionLayers"

class Rigidbody extends Component {
    // COMPONENT METADATA //
    public readonly type: ComponentType = ComponentType.RIGIDBODY
    public readonly _componentRequirements: ComponentType[] = [ComponentType.TRANSFORM]

    // COMPONENT PROPERTIES //
    public ownerTransform: Transform
    public collisionLayer: CollisionLayer = CollisionLayers.DEFAULT

    private lastPosition: Vector
    private acceleration: Vector
    private isMovable: boolean = true
    public mass: number = 1

    constructor(owner: Node) {
        super(owner)
        this.ownerTransform = owner.getComponent(ComponentType.TRANSFORM) as Transform
        Physics._registerRigidbody(this)

        this.lastPosition = this.ownerTransform.position.copy()
        this.acceleration = Vector.ZERO
    }

    public _updatePosition(physicDeltaTime: number): void {
        const velocity = this.ownerTransform.position.subtract(this.lastPosition)
        this.lastPosition = this.ownerTransform.position.copy()
        this.ownerTransform.position = this.ownerTransform.position
            .add(velocity)
            .add(
                this.acceleration.multiply(
                    physicDeltaTime *
                        physicDeltaTime *
                        Physics.positionScale *
                        Physics.positionScale
                )
            )
        this.acceleration = Vector.ZERO
    }

    public accelerate(acc: Vector): void {
        this.acceleration = this.acceleration.add(acc)
    }
    
    public setVelocity(vel: Vector): void
    {
        this.lastPosition = this.ownerTransform.position.subtract(vel.multiply(Time.deltaTime()))
    }
}

export default Rigidbody
