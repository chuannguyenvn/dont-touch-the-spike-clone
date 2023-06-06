import Game from "../system/Game.js";
import ComponentType from "../component/ComponentType.js";
import Debug from "../system/Debug.js";
import Transform from "../component/Transform.js";
import Sprite from "../component/Sprite.js";
import RectangleCollider from "../component/RectangleCollider.js";
import CircleCollider from "../component/CircleCollider.js";
class Actor {
    constructor() {
        this.components = [];
        Game.registerUpdatable(this);
    }
    update(deltaTime) {
        //
    }
    getComponent(componentType) {
        let result = this.components.filter(component => component.type === componentType);
        if (result.length === 0)
            Debug.logError(`Component of type ${componentType} not found on actor ${this.name}`);
        return result[0];
    }
    addComponent(componentType) {
        if (this.components.findIndex(component => component.type === componentType) !== -1) {
            Debug.logError(`Component of type ${componentType} already exists on actor ${this.name}.`);
            return;
        }
        let newComponent;
        switch (componentType) {
            case ComponentType.TRANSFORM:
                newComponent = new Transform(this);
                break;
            case ComponentType.SPRITE:
                newComponent = new Sprite(this);
                break;
            case ComponentType.RECTANGLE_COLLIDER:
                newComponent = new RectangleCollider(this);
                break;
            case ComponentType.CIRCLE_COLLIDER:
                newComponent = new CircleCollider(this);
                break;
        }
        for (let requirement of newComponent.componentRequirements) {
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
}
export default Actor;
//# sourceMappingURL=Actor.js.map