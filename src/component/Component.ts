import ComponentType from "./ComponentType.js"

class Component
{
    public readonly type: ComponentType

    constructor(type: ComponentType)
    {
        this.type = type
    }
}

export default Component