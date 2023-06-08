﻿import Node from "./engine/node/Node"
import Transform from "./engine/component/Transform"
import Renderer from "./engine/component/Renderer"
import ComponentType from "./engine/component/ComponentType"
import Vector from "./engine/types/Vector"
import Circle from "./engine/types/Circle"
import Color from "./engine/types/Color"
import Ease from "./engine/system/tween/Ease"

class TrailDot extends Node
{
    public transform: Transform
    public renderer: Renderer

    constructor(name: string, position: Vector) {
        super(name)
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.transform.tweenScale(Vector.zero(), 0.2, 0, Ease.IN_EXPO, false)
        // Why?
        this.transform.position = new Vector(position.x, position.y)

        const circle = new Circle(8, new Color(0.93, 0.2, 0.38))
        this.renderer = this.addComponent(ComponentType.RENDERER) as Renderer
        this.renderer.setDrawable(circle)
        this.renderer.drawOrder = 0
    }
}

export default TrailDot