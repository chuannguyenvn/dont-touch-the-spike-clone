import ObjectPool from '../../utility/ObjectPool'
import Component from './Component'
import Node from '../Node'
import Debug from '../../system/Debug'
import ComponentType from './ComponentType'
import Rigidbody from './Rigidbody'
import Vector from '../../math/Vector'
import Transform from './Transform'

class ParticleEmitter<T extends Node> extends Component {
    // COMPONENT METADATA //
    public readonly type: ComponentType = ComponentType.PARTICLE_EMITTER
    public readonly _componentRequirements: ComponentType[] = [ComponentType.TRANSFORM]

    // COMPONENT PROPERTIES //
    private _initialized: boolean = false
    private _pool: ObjectPool<T>

    private _count: number = 10
    private _velocityMagnitude: number = 10

    constructor(owner: Node) {
        super(owner)
    }

    public init(createFunction: () => T): ParticleEmitter<T> {
        Debug.assert(!this._initialized, 'Particle emitter is used before initialization.')

        this._initialized = true
        this._pool = new ObjectPool<T>(createFunction)

        return this
    }

    public setCount(count: number): ParticleEmitter<T> {
        this._count = count
        return this
    }

    public setVelocityMagnitude(velMag: number): ParticleEmitter<T> {
        this._velocityMagnitude = velMag
        return this
    }

    public play(): void {
        for (let i = 0; i < this._count; i++) {
            const particle = this._pool.getObject()

            const transform = particle.getComponent(ComponentType.TRANSFORM) as Transform
            transform.globalPosition = Vector.ZERO

            const rigidbody = particle.getComponent(ComponentType.RIGIDBODY) as Rigidbody
            rigidbody.setVelocity(Vector.RANDOM_UNIT.multiply(this._velocityMagnitude))
        }
    }
}

export default ParticleEmitter
