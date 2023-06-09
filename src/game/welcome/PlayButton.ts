import Node from '../../engine/node/Node'
import ComponentType from '../../engine/component/ComponentType'
import Transform from '../../engine/component/Transform'
import Vector from '../../engine/math/Vector'
import Button from '../../engine/component/Button'
import Rectangle from '../../engine/rendering/Rectangle'
import Color from '../../engine/math/Color'
import { Alignment } from '../../engine/component/UIElement'
import Text from '../../engine/component/Text'
import TextContent from '../../engine/rendering/TextContent'
import BirdGame from '../BirdGame'
import GameState from '../GameState'

class PlayButton extends Node {
    public transform: Transform
    public button: Button
    public text: Text

    init(): void {
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.transform.position = new Vector(0, -100)

        const rectangle = new Rectangle(new Vector(200, 100), Color.WHITE)
        this.button = this.addComponent(ComponentType.BUTTON) as Button
        this.button.elementSize = new Vector(200, 100)
        this.button.setDrawable(rectangle)
        this.button.pivot = Alignment.MID_CENTER

        const textContent = new TextContent('Play', Color.GREY)
        textContent.font = '30px tahoma'
        this.text = this.addComponent(ComponentType.TEXT) as Text
        this.text.setDrawable(textContent)

        this.button.clicked.subscribe(this.changeToPlayState.bind(this))
        BirdGame.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))
    }

    private gameStateChangedHandler(gameState: GameState): void {
        if (gameState == GameState.WELCOME) {
            this.isVisible = true
            this.isActive = true
        } else {
            this.isVisible = false
            this.isActive = false
        }
    }

    private changeToPlayState(): void {
        BirdGame.changeState(GameState.PLAY)
    }
}

export default PlayButton
