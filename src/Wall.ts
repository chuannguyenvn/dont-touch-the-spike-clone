import Node from "./engine/node/Node"
import Transform from "./engine/component/Transform"
import Renderer from "./engine/component/Renderer"
import ComponentType from "./engine/component/ComponentType"
import Vector from "./engine/types/Vector"
import RectangleCollider from "./engine/component/RectangleCollider"
import Rectangle from "./engine/types/Rectangle"
import Color from "./engine/types/Color"
import Spike from "./Spike"
import Maths from "./engine/utility/Maths"
import BirdGame from "./BirdGame"
import GameState from "./GameState"

class Wall extends Node
{
    public transform: Transform
    public collider: RectangleCollider
    protected spikes: Spike[] = []

    constructor(name: string)
    {
        super(name)
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.collider = this.addComponent(ComponentType.RECTANGLE_COLLIDER) as RectangleCollider
    
        // BirdGame.gameStateChanged.subscribe(this.stateChangedHandler.bind(this))
    }
    
    private stateChangedHandler(gameState: GameState)
    {
        if (gameState === GameState.PLAY)
        {
            this.isActive = true
            this.isVisible = true
        }
        else
        {
            this.isActive = false
            this.isVisible = false
        }
    }
}

export default Wall