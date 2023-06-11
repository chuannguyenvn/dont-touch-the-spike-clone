import Node from '../../engine/node/Node'
import Transform from '../../engine/node/component/Transform'
import Text from '../../engine/node/component/Text'
import TextContent from '../../engine/rendering/TextContent'
import ComponentType from '../../engine/node/component/ComponentType'
import Color from '../../engine/math/Color'
import { Alignment } from '../../engine/node/component/UIElement'
import BirdGame from '../BirdGame'
import GameState from '../GameState'
import Vector from '../../engine/math/Vector'

class ResultScore extends Node {
    public transform: Transform
    public text: Text
    private textContent: TextContent

    constructor(name: string) {
        super(name)
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.transform.position = new Vector(0, 30)

        this.textContent = new TextContent('', Color.WHITE)
        this.textContent.font = '30px tahoma'
        this.text = this.addComponent(ComponentType.TEXT) as Text
        this.text.setDrawable(this.textContent)
        this.text.pivot = Alignment.MID_CENTER
        this.text.drawOrder = 200

        BirdGame.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))
    }

    private gameStateChangedHandler(gameState: GameState): void {
        if (gameState == GameState.RESULT) {
            this.isVisible = true
            this.isActive = true
            this.textContent.text = `Current score: ${BirdGame.currentScore}`
        } else {
            this.isVisible = false
            this.isActive = false
        }
    }
}

export default ResultScore
