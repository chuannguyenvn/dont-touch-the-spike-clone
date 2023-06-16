﻿import ComponentType from './ComponentType'
import Color from '../../math/Color'
import Renderer from './Renderer'
import Vector from '../../math/Vector'
import Node from '../Node'
import Rect from '../../math/Rect'
import Transform from './Transform'
import DrawLayer from '../../configs-and-resources/DrawLayers'

abstract class UIElement extends Renderer {
    // COMPONENT METADATA //
    public readonly _componentRequirements: ComponentType[] = [ComponentType.TRANSFORM]

    // COMPONENT PROPERTIES //
    public anchor: Alignment = Alignment.MID_CENTER
    public pivot: Alignment = Alignment.MID_CENTER

    public drawOrder: number
    public color: Color
    public elementSize: Vector

    constructor(owner: Node) {
        super(owner)
        this.drawLayer = DrawLayer.UI
    }

    get rect(): Rect {
        const transform = this.owner.getComponent(ComponentType.TRANSFORM) as Transform
        return new Rect(transform.globalPosition, this.elementSize)
    }

    public _draw(): void {
        if (!this.owner.isVisible || !this.drawable) return

        let node: Node | null = this.owner
        while (node) {
            if (!node.isVisible) return
            node = node.parentNode
        }

        let normalizedCoordinate = Vector.ZERO
        switch (this.pivot) {
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

        this.drawable.offSet = this.drawable.offSet.add(
            this.elementSize.multiplyComp(normalizedCoordinate)
        )
        this.drawable._draw()
    }
}

enum Alignment {
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

export { UIElement, Alignment }
