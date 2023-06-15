import Node from '../node/Node'
import Transform from '../node/component/Transform'
import UIText from '../node/component/UIText'
import TextContent from '../rendering/TextContent'
import ComponentType from '../node/component/ComponentType'
import Color from '../math/Color'
import Renderer from '../node/component/Renderer'
import DrawLayer from '../configs-and-resources/DrawLayers'

class PanelWithTextNode extends Node {
    public transform: Transform
    public text: UIText
    public textContent: TextContent
    public panel: Renderer

    constructor(name: string) {
        super(name)
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        this.textContent = new TextContent('Text', Color.WHITE)
        this.text = this.addComponent(ComponentType.TEXT) as UIText
        this.textContent.font = '40px tahoma'
        this.text.setDrawable(this.textContent)
        this.text.drawOrder = 1001

        this.panel = this.addComponent(ComponentType.RENDERER) as Renderer
        this.panel.drawLayer = DrawLayer.UI
    }
}

export default PanelWithTextNode
