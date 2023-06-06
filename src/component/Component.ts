import ComponentType from "./ComponentType.js"

class Component
{
    public readonly type: ComponentType
    public readonly componentRequirements: ComponentType[] = []
}

export default Component