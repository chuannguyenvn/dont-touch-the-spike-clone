import Component from "./Component.js"
import ComponentType from "./ComponentType.js"
import Node from "../node/Node.js"
import Transform from "./Transform.js"
import Canvas from "../system/Canvas.js"

class Sprite extends Component
{
    // COMPONENT METADATA //
    public readonly type: ComponentType = ComponentType.SPRITE
    public readonly componentRequirements: ComponentType[] = [ComponentType.TRANSFORM]

    // COMPONENT PROPERTIES //
    private image: HTMLImageElement
    private ownerTransform: Transform

    constructor(owner: Node, imagePath: string = "")
    {
        super(owner)
        this.setImage(imagePath)
        this.ownerTransform = owner.getComponent(ComponentType.TRANSFORM) as Transform

        Canvas.registerSprite(this)
    }

    draw(): void
    {
        let position = this.ownerTransform.position
        Canvas.canvasContext.drawImage(this.image, position.x, position.y)
    }

    public setImage(imagePath: string): void
    {
        this.image = new Image()
        this.image.src = imagePath
    }
}

export default Sprite
