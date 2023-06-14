import { UIElement } from './UIElement'
import Node from '../Node'
import TextContent from '../../rendering/TextContent'
import Canvas from '../../system/Canvas'
import Vector from '../../math/Vector'
import ComponentType from './ComponentType'

class UIText extends UIElement {
    // COMPONENT METADATA //
    public readonly type: ComponentType = ComponentType.BUTTON
    public readonly _componentRequirements: ComponentType[] = [ComponentType.TRANSFORM]

    // COMPONENT PROPERTIES //
    constructor(owner: Node) {
        super(owner)
    }

    public setDrawable(drawable: TextContent): void {
        super.setDrawable(drawable)

        const metrics = Canvas._canvasContext.measureText(drawable.text)
        const fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
        const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
        this.elementSize = Vector.ZERO // new Vector(metrics.width, actualHeight)
    }
}

export default UIText
