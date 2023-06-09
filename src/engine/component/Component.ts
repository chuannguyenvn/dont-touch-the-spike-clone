import ComponentType from "./ComponentType"
import Node from "../node/Node"

class Component
{
    public isActive = true
    public readonly type: ComponentType
    public readonly _componentRequirements: ComponentType[] = []
    public readonly owner: Node

    constructor(owner: Node) {
        this.owner = owner
    }
}

export default Component