import Node from "../engine/node/Node.js"
import ComponentType from "../engine/component/ComponentType.js"
import Transform from "../engine/component/Transform.js"
import Vector from "../engine/types/Vector.js"
import Button from "../engine/component/Button.js"
import Rectangle from "../engine/types/Rectangle.js"
import Color from "../engine/types/Color.js"
import {Alignment} from "../engine/component/UIElement.js"
import Text from "../engine/component/Text.js"
import TextContent from "../engine/types/TextContent.js"

class PlayButton extends Node
{
    public transform: Transform
    public button: Button
    public text: Text

    init()
    {
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.transform.position = new Vector(0, -300)
        
        this.button = this.addComponent(ComponentType.BUTTON) as Button
        this.button.elementSize = new Vector(200, 100)
        this.button.setDrawable(new Rectangle(new Vector(200, 100), Color.red()))
        this.button.pivot = Alignment.BOTTOM_CENTER
        
        this.text = this.addComponent(ComponentType.TEXT) as Text
        this.text.setDrawable(new TextContent("Play", Color.blue()))
    }
}

export default PlayButton