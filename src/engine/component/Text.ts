import {UIElement} from "./UIElement"
import Node from "../node/Node"
import TextContent from "../types/TextContent"
import Canvas from "../system/Canvas/Canvas"
import Vector from "../types/Vector"

class Text extends UIElement
{
    constructor(owner: Node) {
        super(owner)
    }

    setDrawable(drawable: TextContent): void {
        super.setDrawable(drawable)

        const metrics = Canvas._canvasContext.measureText(drawable.text)
        const fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
        const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
        this.elementSize = Vector.ZERO // new Vector(metrics.width, actualHeight)
    }
}

export default Text