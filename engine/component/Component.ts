import ComponentType from "./ComponentType.js"
import Node from "../node/Node.js"

class Component
{
    public readonly type: ComponentType
    public readonly _componentRequirements: ComponentType[] = []
    public readonly owner: Node
    
    constructor(owner: Node)
    {
        this.owner = owner
    }
}

export default Component