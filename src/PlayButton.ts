import Node from "./engine/node/Node"
import ComponentType from "./engine/component/ComponentType"
import Transform from "./engine/component/Transform"
import Vector from "./engine/types/Vector"
import Button from "./engine/component/Button"
import Rectangle from "./engine/types/Rectangle"
import Color from "./engine/types/Color"
import {Alignment} from "./engine/component/UIElement"
import Text from "./engine/component/Text"
import TextContent from "./engine/types/TextContent"
import BirdGame from "./BirdGame"
import GameState from "./GameState"

class PlayButton extends Node
{
    public transform: Transform
    public button: Button
    public text: Text

    init(): void
    {
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.transform.position = new Vector(0, 0)

        this.button = this.addComponent(ComponentType.BUTTON) as Button
        this.button.elementSize = new Vector(200, 100)
        this.button.setDrawable(new Rectangle(new Vector(200, 100), Color.red()))
        this.button.pivot = Alignment.MID_LEFT
        this.button.clicked.subscribe(() => console.log("clicked"))
        this.button.hovered.subscribe(() => console.log("hovered"))

        this.text = this.addComponent(ComponentType.TEXT) as Text
        this.text.setDrawable(new TextContent("Play", Color.blue()))

        this.button.clicked.subscribe(this.changeToPlayState.bind(this))
        BirdGame.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))
    }

    private gameStateChangedHandler(gameState: GameState): void
    {
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
    
    private changeToPlayState(): void
    {
        BirdGame.changeState(GameState.PLAY)
    }
}

export default PlayButton