import Node from "./engine/node/Node"
import Transform from "./engine/component/Transform"
import ComponentType from "./engine/component/ComponentType"
import TextContent from "./engine/types/TextContent"
import Color from "./engine/types/Color"
import {Alignment} from "./engine/component/UIElement"
import Text from "./engine/component/Text"
import BirdGame from "./BirdGame"
import GameState from "./GameState"

class ScoreText extends Node
{
    public transform: Transform
    public text: Text
    private textContent: TextContent

    constructor(name: string) {
        super(name)
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        this.textContent = new TextContent("00", Color.WHITE)
        this.textContent.font = "100px Courier New"
        this.text = this.addComponent(ComponentType.TEXT) as Text
        this.text.setDrawable(this.textContent)
        this.text.pivot = Alignment.MID_CENTER
        this.text.drawOrder = -1
        BirdGame.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))
    }

    public changeScore(score: number): void {
        this.textContent.text = score.toString()
    }

    private gameStateChangedHandler(gameState: GameState): void {
        if (gameState === GameState.PLAY)
        {
            this.textContent.text = "0"
            this.isVisible = true
            this.isActive = true
        } else
        {
            this.isVisible = false
            this.isActive = false
        }
    }
}

export default ScoreText