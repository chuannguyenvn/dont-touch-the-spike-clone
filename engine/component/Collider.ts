﻿import Component from "./Component.js"
import ComponentType from "./ComponentType.js"
import Node from "../node/Node.js"
import Transform from "./Transform.js"
import Vector from "../types/Vector.js"
import {ParamGameEvent} from "../types/Event.js"
import Physics from "../system/Physics.js"

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
    public offset: Vector

    constructor(owner: Node)
    {
        super(owner)
        Physics.registerCollider(this)
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