﻿import Node from '../../engine/node/Node'
import Transform from '../../engine/node/component/Transform'
import ComponentType from '../../engine/node/component/ComponentType'
import TextContent from '../../engine/rendering/TextContent'
import Color from '../../engine/math/Color'
import { Alignment } from '../../engine/node/component/UIElement'
import UIText from '../../engine/node/component/UIText'
import BirdGame from '../BirdGame'
import GameState from '../GameState'

class ScoreText extends Node {
    public transform: Transform
    public text: UIText
    private textContent: TextContent

    constructor(name: string) {
        super(name)
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        this.textContent = new TextContent('00', new Color(1, 1, 1, 0.5))
        this.textContent.font = '100px tahoma'
        this.text = this.addComponent(ComponentType.TEXT) as UIText
        this.text.setDrawable(this.textContent)
        this.text.pivot = Alignment.MID_CENTER
        this.text.drawOrder = -1
        BirdGame.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))
    }

    public changeScore(score: number): void {
        this.textContent.text = score.toString()
    }

    private gameStateChangedHandler(gameState: GameState): void {
        if (gameState === GameState.PLAY) {
            this.textContent.text = '0'
            this.isVisible = true
            this.isActive = true
        } else {
            this.isVisible = false
            this.isActive = false
        }
    }
}

export default ScoreText
