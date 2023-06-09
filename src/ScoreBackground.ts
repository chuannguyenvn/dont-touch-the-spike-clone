﻿import Node from "./engine/node/Node"
import ComponentType from "./engine/component/ComponentType"
import Renderer from "./engine/component/Renderer"
import Circle from "./engine/types/Circle"
import Color from "./engine/types/Color"
import Transform from "./engine/component/Transform"
import BirdGame from "./BirdGame"
import GameState from "./GameState"
import ThemeManager from "./ThemeManager";
import Ease from "./engine/system/tween/Ease";
import Maths from "./engine/utility/Maths";

class ScoreBackground extends Node
{
    public transform: Transform
    public renderer: Renderer

    constructor(name: string) {
        super(name)

        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        const circle = new Circle(100, new Color(0.1, 0.1, 0.1, 0.2))
        this.renderer = this.addComponent(ComponentType.RENDERER) as Renderer
        this.renderer.setDrawable(circle)
        this.renderer.drawOrder = -2

        BirdGame.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))
    }


    private gameStateChangedHandler(gameState: GameState): void {
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
}

export default ScoreBackground