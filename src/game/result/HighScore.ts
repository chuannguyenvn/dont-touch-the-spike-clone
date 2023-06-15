import Node from '../../engine/node/Node'
import Transform from '../../engine/node/component/Transform'
import UIText from '../../engine/node/component/UIText'
import TextContent from '../../engine/rendering/TextContent'
import ComponentType from '../../engine/node/component/ComponentType'
import Color from '../../engine/math/Color'
import { Alignment } from '../../engine/node/component/UIElement'
import BirdGame from '../BirdGame'
import GameState from '../GameState'
import Vector from '../../engine/math/Vector'

class HighScore extends Node {
    public transform: Transform
    public text: UIText
    private textContent: TextContent

    constructor(name: string) {
        super(name)
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.transform.globalPosition = new Vector(0, -30)

        this.textContent = new TextContent('00', Color.WHITE)
        this.textContent.font = '30px tahoma'
        this.text = this.addComponent(ComponentType.TEXT) as UIText
        this.text.setDrawable(this.textContent)
        this.text.pivot = Alignment.MID_CENTER
        this.text.drawOrder = 200

        this.isVisible = false
        this.isActive = false

        BirdGame.stateMachine.configure(GameState.RESULT).onEntry(this.getGuid(), () => {
            this.isVisible = true
            this.isActive = true
            this.textContent.text = `High score: ${BirdGame.highScore}`
        })

        BirdGame.stateMachine.configure(GameState.RESULT).onExit(this.getGuid(), () => {
            this.isVisible = false
            this.isActive = false
        })
    }
}

export default HighScore
