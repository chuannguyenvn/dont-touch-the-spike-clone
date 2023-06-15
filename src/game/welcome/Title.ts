﻿import Node from '../../engine/node/Node'
import TextContent from '../../engine/rendering/TextContent'
import ComponentType from '../../engine/node/component/ComponentType'
import Vector from '../../engine/math/Vector'
import Color from '../../engine/math/Color'
import { Alignment } from '../../engine/node/component/UIElement'
import BirdGame from '../BirdGame'
import GameState from '../GameState'
import Transform from '../../engine/node/component/Transform'
import UIText from '../../engine/node/component/UIText'
import Ease from '../../engine/utility/tween/Ease'

class Title extends Node {
    public transform: Transform
    public text: UIText
    private textContent: TextContent

    constructor(name: string) {
        super(name)
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        this.textContent = new TextContent("DON'T TOUCH", Color.GREY)
        this.textContent.font = '60px tahoma'
        this.text = this.addComponent(ComponentType.TEXT) as UIText
        this.text.setDrawable(this.textContent)
        this.text.pivot = Alignment.MID_CENTER
        this.text.drawOrder = 200

        BirdGame.stateMachine.configure(GameState.WELCOME).onEntry(this.getGuid(), () => {
            this.transform.globalPosition = new Vector(0, 150)

            this.isVisible = true
            this.isActive = true
        })

        BirdGame.stateMachine.configure(GameState.WELCOME).onExit(this.getGuid(), () => {
            this.transform.tweenPositionY(500, 0.5, 0, Ease.OUT_CUBIC, false, () => {
                this.isVisible = false
                this.isActive = false
            })
        })
    }
}

class TitleBottom extends Node {
    public transform: Transform
    public text: UIText
    private textContent: TextContent

    constructor(name: string) {
        super(name)
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.transform.globalPosition = new Vector(0, 80)

        this.textContent = new TextContent('THE SPIKE', Color.GREY)
        this.textContent.font = '60px tahoma'
        this.text = this.addComponent(ComponentType.TEXT) as UIText
        this.text.setDrawable(this.textContent)
        this.text.pivot = Alignment.MID_CENTER
        this.text.drawOrder = 200

        BirdGame.stateMachine.configure(GameState.WELCOME).onEntry(this.getGuid(), () => {
            this.isVisible = true
            this.isActive = true
        })

        BirdGame.stateMachine.configure(GameState.WELCOME).onExit(this.getGuid(), () => {
            this.isVisible = false
            this.isActive = false
        })
    }
}

export { Title, TitleBottom }
