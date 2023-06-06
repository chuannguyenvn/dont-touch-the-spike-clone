import Game from "../Game.js";
import ComponentType from "../component/ComponentType.js";
import Debug from "../Debug.js";
import Transform from "../component/Transform.js";
class Actor {
    constructor() {
        this.components = [];
        Game.registerUpdatable(this);
    }
    update(deltaTime) {
        console.log(deltaTime);
    }
    getComponent(componentType) {
        let result = this.components.filter(component => component.type == componentType);
        if (result.length === 0)
            Debug.logError(`Component of type ${componentType} not found on actor ${this.name}`);
        return result[0];
    }
    addComponent(componentType) {
        if (this.components.findIndex(component => component.type == componentType)) {
            Debug.logError(`Component of type ${componentType} already exists on actor ${this.name}.`);
            return;
        }
        let newComponent;
        switch (componentType) {
            case ComponentType.TRANSFORM:
                newComponent = new Transform();
                break;
        }
        for (let requirement of newComponent.componentRequirements) {
            if (this.components.findIndex(component => component.type == componentType)) {
                Debug.logError(`Component of type ${newComponent} requires component of type ${requirement}.`);
                return;
            }
        }
        this.components.push(newComponent);
    }
    removeComponent(componentType) {
        // TODO
    }
}
export default Actor;
//# sourceMappingURL=Actor.js.map