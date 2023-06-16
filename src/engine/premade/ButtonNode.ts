import Node from '../node/Node'
import Transform from '../node/component/Transform'
import UIButton from '../node/component/UIButton'
import UIText from '../node/component/UIText'
import ComponentType from '../node/component/ComponentType'
import Vector from '../math/Vector'
import { Alignment } from '../node/component/UIElement'
import TextContent from '../rendering/TextContent'
import Color from '../math/Color'
import Resource from '../system/Resource'
import NineSliceType from '../configs-and-resources/NineSliceTypes'
import NineSlice from "../rendering/NineSlice"

class ButtonNode extends Node {
    public transform: Transform
    public button: UIButton
    public text: UIText
    public textContent: TextContent
    
    protected idleButtonNineSlice: NineSlice
    protected hoveredButtonNineSlice: NineSlice

    constructor(name: string, idleNiceSlice: NineSlice, hoveredNiceSlice: NineSlice) {
        super(name)

        this.idleButtonNineSlice = idleNiceSlice
        this.hoveredButtonNineSlice = hoveredNiceSlice
        
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        this.button = this.addComponent(ComponentType.BUTTON) as UIButton
        this.button.pivot = Alignment.MID_CENTER
        this.button.drawOrder = 1000
        this.button.setDrawable(this.idleButtonNineSlice)
        
        this.textContent = new TextContent('Text', Color.WHITE)
        this.text = this.addComponent(ComponentType.TEXT) as UIText
        this.textContent.font = '40px tahoma'
        this.text.setDrawable(this.textContent)
        this.text.drawOrder = 1001

        this.button.hovered.subscribe(() => {
            this.button.setDrawable(this.hoveredButtonNineSlice)
        })
        this.button.unhovered.subscribe(() => {
            this.button.setDrawable(this.idleButtonNineSlice)
        })
    }
    
    public setButtonSize(size: Vector): void
    {
        this.idleButtonNineSlice.width = this.hoveredButtonNineSlice.width = size.x
        this.idleButtonNineSlice.height = this.hoveredButtonNineSlice.height = size.y
        this.button.elementSize = size
    }
}

export default ButtonNode
