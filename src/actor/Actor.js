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
        switch (componentType) {
            case ComponentType.TRANSFORM:
                this.components.push(new Transform());
                break;
        }
    }
    removeComponent(componentType) {
        // TODO
    }
}
export default Actor;
//# sourceMappingURL=Actor.js.map