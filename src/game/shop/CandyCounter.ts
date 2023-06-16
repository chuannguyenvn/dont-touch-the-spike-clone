import Node from '../../engine/node/Node'
import Transform from '../../engine/node/component/Transform'
import UIText from '../../engine/node/component/UIText'
import RendererNode from '../../engine/premade/RendererNode'
import ComponentType from '../../engine/node/component/ComponentType'
import Resource from '../../engine/system/Resource'
import SpriteType from '../../engine/configs-and-resources/SpriteTypes'
import Vector from "../../engine/math/Vector"
import TextContent from "../../engine/rendering/TextContent"
import BirdGame from "../BirdGame"
import GameState from "../GameState"

class CandyCounter extends Node {
    public transform: Transform
    public text: UIText
    public rendererNode: RendererNode
    private textContent: TextContent

    constructor(name: string) {
        super(name)

        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.transform.globalPosition = new Vector(-175, 200)
        
        this.textContent = new TextContent("10")
        this.text = this.addComponent(ComponentType.TEXT) as UIText
        this.text.setDrawable(this.textContent)

        const candySprite = Resource.getSprite(SpriteType.CANDY)
        candySprite.scale = Vector.ONE.multiply(0.34)
        candySprite.offSet = new Vector(150, 0)
        this.rendererNode = new RendererNode('Candy Sprite')
        this.rendererNode.renderer.setDrawable(candySprite)
        this.rendererNode.setParent(this)
        this.isVisible = false

        BirdGame.stateMachine.configure(GameState.SHOP).onEntry(this.getGuid(), () => {
            this.isVisible = true
        })

        BirdGame.stateMachine.configure(GameState.SHOP).onExit(this.getGuid(), () => {
            this.isVisible = false
        })
    }
}

export default CandyCounter