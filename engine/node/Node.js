import Game from "../system/Game.js";
import ComponentType from "../component/ComponentType.js";
import Debug from "../system/Debug.js";
import Transform from "../component/Transform.js";
import Renderer from "../component/Renderer.js";
import RectangleCollider from "../component/RectangleCollider.js";
import CircleCollider from "../component/CircleCollider.js";
import Button from "../component/Button.js";
import Text from "../component/Text.js";
class Node {
    constructor(name) {
        this.parentNode = null;
        this.childNodes = [];
        this.components = [];
        this.name = name;
        Game._registerNode(this);
        this.init();
    }
    init() {
    }
    start() {
    }
    update() {
    }
    _executeStart() {
        this.start();
        for (let i = 0; i < this.childNodes.length; i++) {
            this.childNodes[i]._executeStart();
        }
    }
    _executeUpdate() {
        this.update();
        for (let i = 0; i < this.childNodes.length; i++) {
            this.childNodes[i]._executeUpdate();
        }
    }
    getComponent(componentType) {
        let result = this.components.filter(component => component.type === componentType);
        if (result.length === 0)
            Debug.logError(`Component of type ${componentType} not found on actor ${this.name}`);
        return result[0];
    }
    addComponent(componentType) {
        let i = this.components.findIndex(component => component.type === componentType);
        if (i !== -1) {
            Debug.logError(`Component of type ${componentType} already exists on actor ${this.name}.`);
            return this.components[i];
        }
        let newComponent;
        switch (componentType) {
            case ComponentType.TRANSFORM:
                newComponent = new Transform(this);
                break;
            case ComponentType.RENDERER:
                newComponent = new Renderer(this);
                break;
            case ComponentType.RECTANGLE_COLLIDER:
                newComponent = new RectangleCollider(this);
                break;
            case ComponentType.CIRCLE_COLLIDER:
                newComponent = new CircleCollider(this);
                break;
            case ComponentType.BUTTON:
                newComponent = new Button(this);
                break;
            case ComponentType.TEXT:
                newComponent = new Text(this);
                break;
        }
        for (let requirement of newComponent._componentRequirements) {
            if (this.components.findIndex(component => component.type == requirement) == -1) {
                Debug.logError(`Component of type ${newComponent} requires component of type ${requirement}.`);
                return;
            }
        }
        this.components.push(newComponent);
        return newComponent;
    }
    removeComponent(componentType) {
        // TODO
    }
    setChild(childNode) {
        if (this.childNodes.includes(childNode))
            return;
        this.childNodes.push(childNode);
        childNode.parentNode = this;
    }
    removeChild(childNode) {
        if (!this.childNodes.includes(childNode))
            return;
        this.childNodes = this.childNodes.filter((c) => c !== childNode);
        childNode.parentNode = null;
    }
    setParent(parentNode) {
        parentNode.setChild(this);
    }
    removeParent() {
        if (this.parentNode === null)
            return;
        else
            this.parentNode.removeChild(this);
    }
}
export default Node;
//# sourceMappingURL=Node.js.map