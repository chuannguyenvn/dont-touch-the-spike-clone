import Component from "./Component.js"
import ComponentType from "./ComponentType.js"
import Actor from "../actor/Actor.js"
import Transform from "./Transform.js"
import Vector2 from "../types/Vector2"
import {ParamGameEvent} from "../types/Event"

class Collider extends Component
{
    // COMPONENT METADATA //
    public readonly componentRequirements: ComponentType[] = [ComponentType.TRANSFORM]

    // COMPONENT PROPERTIES //
    public collisionStarted: ParamGameEvent<Collider> = new ParamGameEvent<Collider>()
    public collisionHappening: ParamGameEvent<Collider> = new ParamGameEvent<Collider>()
    public collisionEnded: ParamGameEvent<Collider> = new ParamGameEvent<Collider>()
    private currentFrameCollidingColliders: Collider[] = []
    private lastFrameCollidingColliders: Collider[] = []

    protected ownerTransform: Transform
    public offset: Vector2

    constructor(owner: Actor)
    {
        super(owner)
        this.ownerTransform = owner.getComponent(ComponentType.TRANSFORM) as Transform
    }

    public getWorldPosition()
    {
        return this.ownerTransform.position.add(this.offset)
    }

    public addCollidingCollider(collider: Collider)
    {
        this.currentFrameCollidingColliders.push(collider)
        if (this.lastFrameCollidingColliders.findIndex(c => c === collider) === -1)
        {
            this.collisionStarted.invoke(collider)
        }
        else
        {
            this.collisionHappening.invoke(collider)
        }
    }

    public confirmCollidingColliders()
    {
        for (let collider of this.lastFrameCollidingColliders)
        {
            if (this.currentFrameCollidingColliders.findIndex(c => c === collider) === -1)
            {
                this.collisionEnded.invoke(collider)
            }
        }

        this.lastFrameCollidingColliders = this.currentFrameCollidingColliders
    }
}

export default Collider