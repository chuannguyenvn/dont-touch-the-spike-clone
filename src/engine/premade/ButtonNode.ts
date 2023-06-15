import Node from '../node/Node'
import Transform from '../node/component/Transform'
import UIButton from '../node/component/UIButton'
import UIText from '../node/component/UIText'
import ComponentType from '../node/component/ComponentType'
import Vector from '../math/Vector'
import { Alignment } from '../node/component/UIElement'
import TextContent from '../rendering/TextContent'
import Color from '../math/Color'

class ButtonNode extends Node {
    public transform: Transform
    public button: UIButton
    public text: UIText
    public textContent: TextContent

    init(): void {
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        this.button = this.addComponent(ComponentType.BUTTON) as UIButton
        this.button.pivot = Alignment.MID_CENTER
        this.button.drawOrder = 1000
        this.button.elementSize = new Vector(200, 100)

        this.textContent = new TextContent('Text', Color.WHITE)
        this.text = this.addComponent(ComponentType.TEXT) as UIText
        this.textContent.font = '40px tahoma'
        this.text.setDrawable(this.textContent)
        this.text.drawOrder = 1001
    }
}

export default ButtonNode
