import Updatable from "../system/Updatable.js"
import Game from "../system/Game.js"
import Component from "../component/Component.js"
import ComponentType from "../component/ComponentType.js"
import Debug from "../system/Debug.js"
import Transform from "../component/Transform.js"
import Renderer from "../component/Renderer.js"
import RectangleCollider from "../component/RectangleCollider.js"
import CircleCollider from "../component/CircleCollider.js"

class Node
{
    public name: string
    public parentNode: Node | null = null
    public childNodes: Node[] = []
    private components: Component[] = []

    constructor(name: string)
    {
        this.name = name
        Game.registerUpdatable(this)
    }

    public start(): void
    {

    }

    public update(): void
    {

    }

    public executeStart(): void
    {
        this.start()
        for (let i = 0; i < this.childNodes.length; i++)
        {
            this.childNodes[i].executeStart()
        }
    }

    public executeUpdate(): void
    {
        this.update()
        for (let i = 0; i < this.childNodes.length; i++)
        {
            this.childNodes[i].executeUpdate()
        }
    }

    public getComponent(componentType: ComponentType): Component
    {
        let result = this.components.filter(component => component.type === componentType)
        if (result.length === 0) Debug.logError(`Component of type ${componentType} not found on actor ${this.name}`)
        return result[0]
    }


    public addComponent(componentType: ComponentType): Component | undefined
    {
        if (this.components.findIndex(component => component.type === componentType) !== -1)
        {
            Debug.logError(`Component of type ${componentType} already exists on actor ${this.name}.`)
            return
        }

        let newComponent: Component
        switch (componentType)
        {
            case ComponentType.TRANSFORM:
                newComponent = new Transform(this)
                break
            case ComponentType.RENDERER:
                newComponent = new Renderer(this)
                break
            case ComponentType.RECTANGLE_COLLIDER:
                newComponent = new RectangleCollider(this)
                break
            case ComponentType.CIRCLE_COLLIDER:
                newComponent = new CircleCollider(this)
                break
        }

        for (let requirement of newComponent.componentRequirements)
        {
            if (this.components.findIndex(component => component.type == requirement) == -1)
            {
                Debug.logError(`Component of type ${newComponent} requires component of type ${requirement}.`)
                return
            }
        }

        this.components.push(newComponent)
        return newComponent
    }

    public removeComponent(componentType: ComponentType): void
    {
        // TODO
    }

    public setChild(childNode: Node)
    {
        if (this.childNodes.includes(childNode)) return
        this.childNodes.push(childNode)
        childNode.parentNode = this
    }

    public removeChild(childNode: Node)
    {
        if (!this.childNodes.includes(childNode)) return
        this.childNodes = this.childNodes.filter((c) => c !== childNode)
        childNode.parentNode = null
    }

    public setParent(parentNode: Node)
    {
        parentNode.setChild(this)
    }

    public removeParent()
    {
        if (this.parentNode === null)
            return
        else
            this.parentNode.removeChild(this)
    }
}


export default Node