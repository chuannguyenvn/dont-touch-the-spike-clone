import Updatable from "../system/Updatable.js"
import Game from "../system/Game.js"
import Component from "../component/Component.js"
import ComponentType from "../component/ComponentType.js"
import Debug from "../system/Debug.js"
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
        if (this.components.findIndex(component => component.type == componentType))
        {
            Debug.logError(`Component of type ${componentType} already exists on actor ${this.name}.`)
            return
        }

        let newComponent: Component
        switch (componentType)
        {
            case ComponentType.TRANSFORM:
                newComponent = new Transform()
                break
        }

        for (let requirement of newComponent.componentRequirements)
        {
            if (this.components.findIndex(component => component.type == componentType))
            {
                Debug.logError(`Component of type ${newComponent} requires component of type ${requirement}.`)
                return
            }
        }

        this.components.push(newComponent)
    }

    public removeComponent(componentType: ComponentType): void
    {
        // TODO
    }
}

export default Actor