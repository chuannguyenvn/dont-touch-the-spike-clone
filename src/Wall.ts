﻿import Node from "./engine/node/Node"
import Transform from "./engine/component/Transform"
import ComponentType from "./engine/component/ComponentType"
import RectangleCollider from "./engine/component/RectangleCollider"
import Spike from "./Spike"

class Wall extends Node
{
    public transform: Transform
    public collider: RectangleCollider
    protected spikes: Spike[] = []

    constructor(name: string) {
        super(name)
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.collider = this.addComponent(ComponentType.RECTANGLE_COLLIDER) as RectangleCollider
    }
}

export default Wall