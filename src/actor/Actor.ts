import Updatable from "../Updatable.js";
import Game from "../Game.js";

class Actor implements Updatable
{
    constructor()
    {
        Game.registerUpdatable(this);
    }

    update(deltaTime: number): void
    {
        console.log(deltaTime)
    }
}

export default Actor;