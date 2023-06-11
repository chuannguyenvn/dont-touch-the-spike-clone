import Node from '../../engine/node/Node'
import Transform from '../../engine/node/component/Transform'
import Button from '../../engine/node/component/Button'
import Text from '../../engine/node/component/Text'
import ComponentType from '../../engine/node/component/ComponentType'
import Vector from '../../engine/math/Vector'
import Rectangle from '../../engine/rendering/Rectangle'
import Color from '../../engine/math/Color'
import { Alignment } from '../../engine/node/component/UIElement'
import TextContent from '../../engine/rendering/TextContent'
import BirdGame from '../BirdGame'
import GameState from '../GameState'

class RetryButton extends Node {
    public transform: Transform
    public button: Button
    public text: Text

    init(): void {
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.transform.position = new Vector(0, -150)

        const rectangle = new Rectangle(new Vector(200, 100), Color.WHITE)
        this.button = this.addComponent(ComponentType.BUTTON) as Button
        this.button.elementSize = new Vector(200, 100)
        this.button.setDrawable(rectangle)
        this.button.pivot = Alignment.MID_CENTER

        const textContent = new TextContent('Retry', Color.GREY)
        textContent.font = '30px tahoma'
        this.text = this.addComponent(ComponentType.TEXT) as Text
        this.text.setDrawable(textContent)

        this.button.clicked.subscribe(this.changeToPlayState.bind(this))
        BirdGame.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))
    }

    private gameStateChangedHandler(gameState: GameState): void {
        if (gameState == GameState.RESULT) {
            this.isVisible = true
            this.isActive = true
        } else {
            this.isVisible = false
            this.isActive = false
        }
    }

    private changeToPlayState(): void {
        BirdGame.changeState(GameState.WELCOME)
    }
}

export default RetryButton
