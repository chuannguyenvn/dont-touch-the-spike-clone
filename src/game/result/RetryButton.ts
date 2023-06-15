import Node from '../../engine/node/Node'
import Transform from '../../engine/node/component/Transform'
import UIButton from '../../engine/node/component/UIButton'
import UIText from '../../engine/node/component/UIText'
import ComponentType from '../../engine/node/component/ComponentType'
import Vector from '../../engine/math/Vector'
import RectangleShape from '../../engine/rendering/RectangleShape'
import Color from '../../engine/math/Color'
import { Alignment } from '../../engine/node/component/UIElement'
import TextContent from '../../engine/rendering/TextContent'
import BirdGame from '../BirdGame'
import GameState from '../GameState'

class RetryButton extends Node {
    public transform: Transform
    public button: UIButton
    public text: UIText

    init(): void {
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.transform.globalPosition = new Vector(0, -150)

        const rectangle = new RectangleShape(new Vector(200, 100), Color.WHITE)
        this.button = this.addComponent(ComponentType.BUTTON) as UIButton
        this.button.elementSize = new Vector(200, 100)
        this.button.setDrawable(rectangle)
        this.button.pivot = Alignment.MID_CENTER
        this.button.drawOrder = 1000

        const textContent = new TextContent('Retry', Color.GREY)
        textContent.font = '30px tahoma'
        this.text = this.addComponent(ComponentType.TEXT) as UIText
        this.text.setDrawable(textContent)

        this.isVisible = false
        this.isActive = false

        this.button.clicked.subscribe(this.changeToPlayState.bind(this))
        this.button.hovered.subscribe(() => {
            rectangle.color = Color.WHITE
        })
        this.button.unhovered.subscribe(() => {
            rectangle.color = Color.BLACK
        })
        BirdGame.stateMachine.configure(GameState.RESULT).onEntry(this.getGuid(), () => {
            this.isVisible = true
            this.isActive = true
        })

        BirdGame.stateMachine.configure(GameState.RESULT).onExit(this.getGuid(), () => {
            this.isVisible = false
            this.isActive = false
        })
    }

    private changeToPlayState(): void {
        BirdGame.stateMachine.changeState(GameState.WELCOME)
    }
}

export default RetryButton
