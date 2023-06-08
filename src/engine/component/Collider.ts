import Component from "./Component"
import ComponentType from "./ComponentType"
import Node from "../node/Node"
import Transform from "./Transform"
import Vector from "../types/Vector.js"
import {ParamGameEvent} from "../types/Event.js"
import Physics from "../system/Physics.js"

class Collider extends Component
{
    // COMPONENT METADATA //
    public readonly _componentRequirements: ComponentType[] = [ComponentType.TRANSFORM]

    // COMPONENT PROPERTIES //
    private _currentFrameCollidingColliders: Collider[] = []
    private _lastFrameCollidingColliders: Collider[] = []
    protected _ownerTransform: Transform
    
    public collisionStarted: ParamGameEvent<Collider> = new ParamGameEvent<Collider>()
    public collisionHappening: ParamGameEvent<Collider> = new ParamGameEvent<Collider>()
    public collisionEnded: ParamGameEvent<Collider> = new ParamGameEvent<Collider>()
    public offset: Vector

    constructor(owner: Node)
    {
        super(owner)
        Physics._registerCollider(this)
        this._ownerTransform = owner.getComponent(ComponentType.TRANSFORM) as Transform
    }

    public _getWorldPosition(): Vector
    {
        return this._ownerTransform.position.add(this.offset)
    }

    public _addCollidingCollider(collider: Collider): void
    {
        this._currentFrameCollidingColliders.push(collider)
        if (this._lastFrameCollidingColliders.findIndex(c => c === collider) === -1)
        {
            this.collisionStarted.invoke(collider)
        }
        else
        {
            this.collisionHappening.invoke(collider)
        }
    }

    public _confirmCollidingColliders(): void
    {
        for (const collider of this._lastFrameCollidingColliders)
        {
            if (this._currentFrameCollidingColliders.findIndex(c => c === collider) === -1)
            {
                this.collisionEnded.invoke(collider)
            }
        }

        this._lastFrameCollidingColliders = this._currentFrameCollidingColliders
    }
}

export default Collider