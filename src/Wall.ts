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
    }
}

export default Wall