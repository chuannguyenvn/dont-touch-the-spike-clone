import {UIElement} from "./UIElement.js"
import Node from "../node/Node.js"
import TextContent from "../types/TextContent.js"
import Canvas from "../system/Canvas.js"
import Vector from "../types/Vector.js"

class Text extends UIElement
{
    constructor(owner: Node)
    {
        super(owner)
    }
    
    setDrawable(drawable: TextContent): void
    {
        super.setDrawable(drawable)

        let metrics = Canvas._canvasContext.measureText(drawable.text);
        let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
        let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        this.elementSize = new Vector(metrics.width, actualHeight)
    }
}

export default Text