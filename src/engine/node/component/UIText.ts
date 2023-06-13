import { UIElement } from './UIElement'
import Node from '../Node'
import TextContent from '../../rendering/TextContent'
import Canvas from '../../system/Canvas'
import Vector from '../../math/Vector'

class UIText extends UIElement {
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
