import Node from '../../engine/node/Node'
import ComponentType from '../../engine/node/component/ComponentType'
import Transform from '../../engine/node/component/Transform'
import Vector from '../../engine/math/Vector'
import UIButton from '../../engine/node/component/UIButton'
import RectangleShape from '../../engine/rendering/RectangleShape'
import Color from '../../engine/math/Color'
import { Alignment } from '../../engine/node/component/UIElement'
import UIText from '../../engine/node/component/UIText'
import TextContent from '../../engine/rendering/TextContent'
import BirdGame from '../BirdGame'
import GameState from '../GameState'

class PlayButton extends Node {
    public transform: Transform
    public button: UIButton
    public text: UIText

    init(): void {
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.transform.globalPosition = new Vector(0, -100)

        const rectangle = new RectangleShape(new Vector(200, 100), Color.WHITE)
        this.button = this.addComponent(ComponentType.BUTTON) as UIButton
        this.button.elementSize = new Vector(200, 100)
        this.button.setDrawable(rectangle)
        this.button.pivot = Alignment.MID_CENTER

        const textContent = new TextContent('Play', Color.GREY)
        textContent.font = '30px tahoma'
        this.text = this.addComponent(ComponentType.TEXT) as UIText
        this.text.setDrawable(textContent)

        this.button.clicked.subscribe(this.changeToPlayState.bind(this))
        BirdGame.stateMachine.configure(GameState.WELCOME).onEntry(this.getGuid(), () => {
            this.isVisible = true
            this.isActive = true
        })

        BirdGame.stateMachine.configure(GameState.WELCOME).onExit(this.getGuid(), () => {
            this.isVisible = false
            this.isActive = false
        })
    }

    private changeToPlayState(): void {
        BirdGame.stateMachine.changeState(GameState.PLAY)
    }
}

export default PlayButton
