import Node from "../../engine/node/Node"
import Transform from "../../engine/component/Transform"
import Renderer from "../../engine/component/Renderer"
import ComponentType from "../../engine/component/ComponentType"
import Rectangle from "../../engine/types/Rectangle"
import Vector from "../../engine/types/Vector"
import Color from "../../engine/types/Color"
import BirdGame from "../BirdGame"
import GameState from "../GameState"

class ResultBackground extends Node
{
    public transform: Transform
    public renderer: Renderer

    constructor(name: string) {
        super(name)

        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        const rectangle = new Rectangle(new Vector(400, 150), new Color(0.5, 0.5, 0.5, 0.5))
        this.renderer = this.addComponent(ComponentType.RENDERER) as Renderer
        this.renderer.setDrawable(rectangle)
        this.renderer.drawOrder = 100

        BirdGame.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))
    }

    private gameStateChangedHandler(gameState: GameState): void {
        if (gameState === GameState.RESULT)
        {
            this.isActive = true
            this.isVisible = true
        } else
        {
            this.isActive = false
            this.isVisible = false
        }
    }
}

export default ResultBackground