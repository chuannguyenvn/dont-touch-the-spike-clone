import ObjectPool from '../../utility/ObjectPool'
import Component from './Component'
import Node from '../Node'
import Debug from '../../system/Debug'
import ComponentType from './ComponentType'
import Vector from '../../math/Vector'
import Ball from '../../../test/Ball'

class ParticleEmitter extends Component {
    // COMPONENT METADATA //
    public readonly type: ComponentType = ComponentType.PARTICLE_EMITTER
    public readonly _componentRequirements: ComponentType[] = [ComponentType.TRANSFORM]
    public _gravity: Vector = Vector.ZERO
    // COMPONENT PROPERTIES //
    private _initialized: boolean = false
    private _pool: ObjectPool<Ball>
    private _count: number = 10
    private _velocityMagnitude: number = 10

    constructor(owner: Node) {
        super(owner)
    }

    public init(maxCount: number): ParticleEmitter {
        Debug.assert(!this._initialized, 'Particle emitter is used before initialization.')

        this._initialized = true
        return this
    }

    public setCount(count: number): ParticleEmitter {
        this._count = count
        return this
    }

    public setVelocityMagnitude(velMag: number): ParticleEmitter {
        this._velocityMagnitude = velMag
        return this
    }

    public setGravity(gravity: Vector): ParticleEmitter {
        this._gravity = gravity
        return this
    }

    public play(): void {
        for (let i = 0; i < this._count; i++) {
            const particle = this._pool.getObject()
            particle.transform.globalPosition = Vector.ZERO

            particle.rigidbody.overrideGravity = this._gravity
            particle.rigidbody.setVelocity(Vector.RANDOM_UNIT.multiply(this._velocityMagnitude))
        }
    }
}

// class ParticleUnit extends Node{
//     private emitter: ParticleEmitter
//
//     public transform: Transform
//     public renderer: Renderer
//     public collider: CircleCollider
//     public rigidbody: Rigidbody
//
//     constructor(name: string) {
//         super(name)
//
//
//         this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
//         this.renderer = this.addComponent(ComponentType.RENDERER) as Renderer
//         this.collider = this.addComponent(ComponentType.CIRCLE_COLLIDER) as CircleCollider
//         this.rigidbody = this.addComponent(ComponentType.RIGIDBODY) as Rigidbody
//     }
// }

export default ParticleEmitter
