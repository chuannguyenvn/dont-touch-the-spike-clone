import ComponentType from "./ComponentType.js"
import Actor from "../actor/Actor.js"

class Component
{
    public readonly type: ComponentType
    public readonly componentRequirements: ComponentType[] = []
    public readonly owner: Actor
    
    constructor(owner: Actor)
    {
        this.owner = owner
    }
}

export default Component