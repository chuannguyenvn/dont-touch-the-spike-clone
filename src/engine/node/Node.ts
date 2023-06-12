import System from '../system/System'
import Component from './component/Component'
import ComponentType from './component/ComponentType'
import Debug from '../system/Debug'
import Transform from './component/Transform'
import Renderer from './component/Renderer'
import RectangleCollider from './component/RectangleCollider'
import CircleCollider from './component/CircleCollider'
import Button from './component/Button'
import Text from './component/Text'
import GUID from '../system/GUID'
import Rigidbody from './component/Rigidbody'

class Node {
    private _guid: number

    public getGuid(): number {
        return this._guid
    }

    public _setGuid(): void {
        this._guid = GUID.getId()
    }

    public name: string
    public isActive = true
    public isVisible = true
    public parentNode: Node | null = null
    public childNodes: Node[] = []
    private components: Component[] = []

    constructor(name: string) {
        this._guid = GUID.getId()
        this.name = name
        System._registerRootNode(this)
        this.init()
    }

    public init(): void {}

    public start(): void {}

    public update(): void {}

    public destroy(): void {}

    public _executeStart(): void {
        this.start()
        for (let i = 0; i < this.childNodes.length; i++) {
            this.childNodes[i]._executeStart()
        }
    }

    public _executeUpdate(): void {
        if (!this.isActive) return
        this.update()

        for (let i = 0; i < this.childNodes.length; i++) {
            this.childNodes[i]._executeUpdate()
        }
    }

    public getComponent(componentType: ComponentType): Component {
        const result = this.components.filter((component) => component.type === componentType)
        if (result.length === 0)
            Debug.logError(`Component of type ${componentType} not found on actor ${this.name}`)
        return result[0]
    }

    public addComponent(componentType: ComponentType): Component | undefined {
        const i = this.components.findIndex((component) => component.type === componentType)
        if (i !== -1) {
            Debug.logError(
                `Component of type ${componentType} already exists on actor ${this.name}.`
            )
            return this.components[i]
        }

        let newComponent: Component
        switch (componentType) {
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
            case ComponentType.RIGIDBODY:
                newComponent = new Rigidbody(this)
                break
            case ComponentType.BUTTON:
                newComponent = new Button(this)
                break
            case ComponentType.TEXT:
                newComponent = new Text(this)
                break
        }

        for (const requirement of newComponent._componentRequirements) {
            if (this.components.findIndex((component) => component.type == requirement) == -1) {
                Debug.logError(
                    `Component of type ${newComponent} requires component of type ${requirement}.`
                )
                return
            }
        }

        this.components.push(newComponent)
        return newComponent
    }

    public removeComponent(componentType: ComponentType): void {
        // TODO
    }

    public setChild(childNode: Node) {
        if (this.childNodes.includes(childNode)) return
        this.childNodes.push(childNode)
        childNode.parentNode = this
    }

    public removeChild(childNode: Node) {
        if (!this.childNodes.includes(childNode)) return
        this.childNodes = this.childNodes.filter((c) => c !== childNode)
        childNode.parentNode = null
    }

    public setParent(parentNode: Node) {
        System._unregisterRootNode(this)
        parentNode.setChild(this)
    }

    public removeParent() {
        if (this.parentNode === null) return
        else this.parentNode.removeChild(this)
        System._registerRootNode(this)
    }
}

export default Node
