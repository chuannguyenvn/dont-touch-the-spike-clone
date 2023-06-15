import Node from '../../engine/node/Node'
import Transform from '../../engine/node/component/Transform'
import ComponentType from '../../engine/node/component/ComponentType'
import ButtonNode from '../../engine/premade/ButtonNode'
import RendererNode from '../../engine/premade/RendererNode'

class ShopItem extends Node {
    public transform: Transform
    public button: ButtonNode
    public skin: RendererNode

    constructor(name: string) {
        super(name)

        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        
        this.button = new ButtonNode("Purchase button")
        this.button.setParent(this)
        
        this.skin = new RendererNode("Skin")
        this.skin.setParent(this)
    }
}

export default ShopItem
