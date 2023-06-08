import Node from "./engine/node/Node"
import Transform from "./engine/component/Transform"
import Renderer from "./engine/component/Renderer"
import ComponentType from "./engine/component/ComponentType"
import TextContent from "./engine/types/TextContent"
import Color from "./engine/types/Color"
import Circle from "./engine/types/Circle"
import {Alignment, UIElement} from "./engine/component/UIElement"
import Text from "./engine/component/Text"
import BirdGame from "./BirdGame"
import GameState from "./GameState"

class ScoreText extends Node
{
    public transform: Transform
    public text: Text
    private textContent: TextContent

    constructor(name: string)
    {
        super(name)
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        this.textContent = new TextContent("00", Color.white())
        this.textContent.font = "100px Courier New"
        this.text = this.addComponent(ComponentType.TEXT) as Text
        this.text.setDrawable(this.textContent)
        this.text.pivot = Alignment.MID_CENTER
        this.text.drawOrder = -1
        BirdGame.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))
    }

    private gameStateChangedHandler(gameState: GameState): void
    {
        if (gameState == GameState.PLAY)
        {
            this.isVisible = true
            this.isActive = true
        }
        else
        {
            this.isVisible = false
            this.isActive = false
        }
    }

    public changeScore(score: number)
    {
        this.textContent.text = score.toString()
    }
}

export default ScoreText