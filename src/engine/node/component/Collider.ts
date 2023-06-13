import Component from './Component'
import ComponentType from './ComponentType'
import Node from '../Node'
import Transform from './Transform'
import Vector from '../../math/Vector'
import { ParamGameEvent } from '../../utility/Event'
import Physics from '../../system/Physics'
import CollisionLayer from '../../configs-and-resources/CollisionLayers'
import CollisionLayers from '../../configs-and-resources/CollisionLayers'

class Collider extends Component {
    // COMPONENT METADATA //
    public readonly _componentRequirements: ComponentType[] = [ComponentType.TRANSFORM]

    // COMPONENT PROPERTIES //
    private _currentFrameCollidingColliders: Collider[] = []
    private _lastFrameCollidingColliders: Collider[] = []

    public collisionStarted: ParamGameEvent<Collider> = new ParamGameEvent<Collider>()
    public collisionHappening: ParamGameEvent<Collider> = new ParamGameEvent<Collider>()
    public collisionEnded: ParamGameEvent<Collider> = new ParamGameEvent<Collider>()
    public offset: Vector
    public _ownerTransform: Transform

    constructor(owner: Node) {
        super(owner)
        Physics._registerCollider(this)
        this._ownerTransform = owner.getComponent(ComponentType.TRANSFORM) as Transform
    }

    public _getWorldPosition(): Vector {
        return this._ownerTransform.globalPosition.add(this.offset)
    }

    public _addCollidingCollider(collider: Collider): void {
        this._currentFrameCollidingColliders.push(collider)
        if (this._lastFrameCollidingColliders.findIndex((c) => c === collider) === -1) {
            this.collisionStarted.invoke(collider)
        } else {
            this.collisionHappening.invoke(collider)
        }
    }

    public _confirmCollidingColliders(): void {
        for (const collider of this._lastFrameCollidingColliders) {
            if (this._currentFrameCollidingColliders.findIndex((c) => c === collider) === -1) {
                this.collisionEnded.invoke(collider)
            }
        }

        this._lastFrameCollidingColliders = this._currentFrameCollidingColliders
    }
}

export default Collider
