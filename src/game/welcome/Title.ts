import Node from "../../engine/node/Node"
import TextContent from "../../engine/rendering/TextContent"
import ComponentType from "../../engine/component/ComponentType"
import Vector from "../../engine/math/Vector"
import Color from "../../engine/math/Color"
import {Alignment} from "../../engine/component/UIElement"
import BirdGame from "../BirdGame"
import GameState from "../GameState"
import Transform from "../../engine/component/Transform"
import Text from "../../engine/component/Text"

class Title extends Node
{
    public transform: Transform
    public text: Text
    private textContent: TextContent

    constructor(name: string) {
        super(name)
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.transform.position = new Vector(0, 150)

        this.textContent = new TextContent("DON'T TOUCH", Color.GREY)
        this.textContent.font = "60px tahoma"
        this.text = this.addComponent(ComponentType.TEXT) as Text
        this.text.setDrawable(this.textContent)
        this.text.pivot = Alignment.MID_CENTER
        this.text.drawOrder = 200

        BirdGame.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))
    }

    private gameStateChangedHandler(gameState: GameState): void {
        if (gameState == GameState.WELCOME)
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
}

class TitleBottom extends Node
{
    public transform: Transform
    public text: Text
    private textContent: TextContent

    constructor(name: string) {
        super(name)
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.transform.position = new Vector(0, 80)

        this.textContent = new TextContent("THE SPIKE", Color.GREY)
        this.textContent.font = "60px tahoma"
        this.text = this.addComponent(ComponentType.TEXT) as Text
        this.text.setDrawable(this.textContent)
        this.text.pivot = Alignment.MID_CENTER
        this.text.drawOrder = 200

        BirdGame.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))
    }

    private gameStateChangedHandler(gameState: GameState): void {
        if (gameState == GameState.WELCOME)
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
}

export {Title, TitleBottom}

