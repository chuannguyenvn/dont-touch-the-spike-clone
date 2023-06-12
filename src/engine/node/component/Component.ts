import ComponentType from './ComponentType'
import Node from '../Node'
import GUID from "../../system/GUID"

class Component {
    public readonly guid: number
    
    public isActive = true
    public readonly type: ComponentType
    public readonly _componentRequirements: ComponentType[] = []
    public readonly owner: Node

    constructor(owner: Node) {
        this.owner = owner
        this.guid = GUID.generate()
    }
}

export default Component
