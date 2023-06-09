import Node from "../../engine/node/Node"
import Transform from "../../engine/component/Transform"
import Text from "../../engine/component/Text"
import TextContent from "../../engine/types/TextContent"
import ComponentType from "../../engine/component/ComponentType"
import Color from "../../engine/types/Color"
import {Alignment} from "../../engine/component/UIElement"
import BirdGame from "../BirdGame"
import GameState from "../GameState"
import Vector from "../../engine/types/Vector"

class HighScore extends Node
{
    public transform: Transform
    public text: Text
    private textContent: TextContent

    constructor(name: string) {
        super(name)
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.transform.position = new Vector(0, -30)

        this.textContent = new TextContent("00", Color.WHITE)
        this.textContent.font = "30px tahoma"
        this.text = this.addComponent(ComponentType.TEXT) as Text
        this.text.setDrawable(this.textContent)
        this.text.pivot = Alignment.MID_CENTER
        this.text.drawOrder = 200

        BirdGame.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))
    }

    private gameStateChangedHandler(gameState: GameState): void {
        if (gameState == GameState.RESULT)
        {
            this.isVisible = true
            this.isActive = true
            this.textContent.text = `High score: ${BirdGame.highScore}`
        } else
        {
            this.isVisible = false
            this.isActive = false
        }
    }
}

export default HighScore