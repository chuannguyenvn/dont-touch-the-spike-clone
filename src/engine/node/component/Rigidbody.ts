import Component from './Component'
import ComponentType from './ComponentType'
import Node from '../Node'
import Transform from './Transform'
import Physics from '../../system/Physics'
import Vector from '../../math/Vector'

class Rigidbody extends Component {
    // COMPONENT METADATA //
    public readonly type: ComponentType = ComponentType.RIGIDBODY
    public readonly _componentRequirements: ComponentType[] = [ComponentType.TRANSFORM]

    // COMPONENT PROPERTIES //
    private ownerTransform: Transform
    private lastPosition: Vector
    private acceleration: Vector

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
            .add(this.acceleration.multiply(physicDeltaTime * physicDeltaTime))
        this.acceleration = Vector.ZERO
    }

    public accelerate(acc: Vector): void {
        this.acceleration = this.acceleration
            .add(acc)
            .multiplyComp(Physics.positionScale)
            .multiplyComp(Physics.positionScale)
    }
}

export default Rigidbody
