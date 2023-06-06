import Updatable from "../Updatable.js"
import Game from "../Game.js"
import Component from "../component/Component.js"
import ComponentType from "../component/ComponentType.js"
import component from "../component/Component.js"
import Debug from "../Debug.js"
import Transform from "../component/Transform.js"

class Actor implements Updatable
{
    public name: string
    private components: Component[] = []

    constructor()
    {
        Game.registerUpdatable(this)
    }

    public update(deltaTime: number): void
    {
        console.log(deltaTime)
    }

    public getComponent(componentType: ComponentType): Component
    {
        let result = this.components.filter(component => component.type == componentType)
        if (result.length === 0) Debug.logError(`Component of type ${componentType} not found on actor ${this.name}`)
        return result[0]
    }

    public addComponent(componentType: ComponentType): void
    {
        switch (componentType)
        {
            case ComponentType.TRANSFORM:
                this.components.push(new Transform())
                break;
        }
    }

    public removeComponent(componentType: ComponentType): void
    {
        // TODO
    }
}

export default Actor