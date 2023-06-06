import Updatable from "../Updatable"

class Actor implements Updatable
{
    constructor()
    {
        
    }

    update(deltaTime: number): void
    {
        console.log(deltaTime)
    }
}

export default Actor;