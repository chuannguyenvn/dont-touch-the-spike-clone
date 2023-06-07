﻿import Component from "./Component.js"
import ComponentType from "./ComponentType.js"
import Drawable from "../types/Drawable.js"
import Color from "../types/Color.js"
import Renderer from "./Renderer.js"
import Matrix from "../types/Matrix.js"
import Vector from "../types/Vector.js"
import Node from "../node/Node.js"

class UIElement extends Renderer
{
    // COMPONENT METADATA //
    public readonly _componentRequirements: ComponentType[] = [ComponentType.TRANSFORM]

    // COMPONENT PROPERTIES //
    public anchor: Alignment = Alignment.MID_CENTER
    public pivot: Alignment = Alignment.MID_CENTER

    public drawOrder: number
    public color: Color
    public elementSize: Vector

    constructor(owner: Node)
    {
        super(owner)
    }

    public _draw(): void
    {
        let normalizedCoordinate = Vector.zero()
        switch (this.pivot)
        {
            case Alignment.TOP_LEFT:
                normalizedCoordinate = new Vector(0, 0)
                break
            case Alignment.TOP_CENTER:
                normalizedCoordinate = new Vector(-0.5, 0)
                break
            case Alignment.TOP_RIGHT:
                normalizedCoordinate = new Vector(-1, 0)
                break
            case Alignment.MID_LEFT:
                normalizedCoordinate = new Vector(0, -0.5)
                break
            case Alignment.MID_CENTER:
                normalizedCoordinate = new Vector(-0.5, -0.5)
                break
            case Alignment.MID_RIGHT:
                normalizedCoordinate = new Vector(-1, -0.5)
                break
            case Alignment.BOTTOM_LEFT:
                normalizedCoordinate = new Vector(0, -1)
                break
            case Alignment.BOTTOM_CENTER:
                normalizedCoordinate = new Vector(-0.5, -1)
                break
            case Alignment.BOTTOM_RIGHT:
                normalizedCoordinate = new Vector(-1, -1)
                break

        }

        this.drawable._draw(this.elementSize.multiplyComp(normalizedCoordinate))
    }

}

enum Alignment
{
    TOP_LEFT,
    TOP_CENTER,
    TOP_RIGHT,
    MID_LEFT,
    MID_CENTER,
    MID_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_CENTER,
    BOTTOM_RIGHT,
}

export {UIElement, Alignment}