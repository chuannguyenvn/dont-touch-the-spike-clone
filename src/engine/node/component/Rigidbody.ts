import Component from './Component'
import ComponentType from './ComponentType'
import Node from '../Node'
import Transform from './Transform'
import Physics from '../../system/Physics'
import Vector from '../../math/Vector'
import Time from '../../system/Time'
import CollisionLayer from '../../configs-and-resources/CollisionLayers'
import CollisionLayers from '../../configs-and-resources/CollisionLayers'

class Rigidbody extends Component {
    // COMPONENT METADATA //
    public readonly type: ComponentType = ComponentType.RIGIDBODY
    public readonly _componentRequirements: ComponentType[] = [ComponentType.TRANSFORM]

    // COMPONENT PROPERTIES //
    public ownerTransform: Transform
    public collisionLayer: CollisionLayer = CollisionLayers.DEFAULT
    public mass: number = 1
    public overrideGravity: Vector | undefined = undefined
    private lastPosition: Vector
    private acceleration: Vector
    private isMovable: boolean = true

    constructor(owner: Node) {
        super(owner)
        this.ownerTransform = owner.getComponent(ComponentType.TRANSFORM) as Transform
        Physics._registerRigidbody(this)

        this.lastPosition = this.ownerTransform.globalPosition.copy()
        this.acceleration = Vector.ZERO
    }

    public _updatePosition(physicDeltaTime: number): void {
        const velocity = this.ownerTransform.globalPosition.subtract(this.lastPosition)
        this.lastPosition = this.ownerTransform.globalPosition.copy()
        this.ownerTransform.globalPosition = this.ownerTransform.globalPosition
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

    public setVelocity(vel: Vector): void {
        this.lastPosition = this.ownerTransform.globalPosition.subtract(
            vel.multiply(Time.deltaTime())
        )
    }
}

export default Rigidbody
