import Game from "../Game.js";
class Actor {
    constructor() {
        Game.registerUpdatable(this);
    }
    update(deltaTime) {
        console.log(deltaTime);
    }
}
export default Actor;
//# sourceMappingURL=Actor.js.map