import Node from '../../engine/node/Node'
import ComponentType from '../../engine/node/component/ComponentType'
import Transform from '../../engine/node/component/Transform'
import Vector from '../../engine/math/Vector'
import UIButton from '../../engine/node/component/UIButton'
import { Alignment } from '../../engine/node/component/UIElement'
import BirdGame from '../BirdGame'
import GameState from '../GameState'
import Resource from '../../engine/system/Resource'
import SpriteType from '../../engine/configs-and-resources/SpriteTypes'
import DrawLayer from '../../engine/configs-and-resources/DrawLayers'
import Time from '../../engine/system/Time'
import Sprite from '../../engine/rendering/Sprite'

class PauseButton extends Node {
    public transform: Transform
    public button: UIButton
    private isPausing: boolean = false
    private pauseSprite: Sprite
    private playSprite: Sprite

    init(): void {
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.transform.globalPosition = new Vector(-175, 275)

        this.pauseSprite = Resource.getSprite(SpriteType.PAUSE)
        this.pauseSprite.scale = Vector.ONE.multiply(0.2)
        this.playSprite = Resource.getSprite(SpriteType.PLAY)
        this.playSprite.scale = Vector.ONE.multiply(0.2)
        this.button = this.addComponent(ComponentType.BUTTON) as UIButton
        this.button.elementSize = new Vector(50, 50)
        this.button.setDrawable(this.pauseSprite)
        this.button.pivot = Alignment.MID_CENTER
        this.button.drawLayer = DrawLayer.UI

        this.isVisible = false
        this.isActive = false

        this.button.clicked.subscribe(this.togglePause.bind(this))
        BirdGame.stateMachine.configure(GameState.PLAY).onEntry(this.getGuid(), () => {
            this.isVisible = true
            this.isActive = true
        })
        BirdGame.stateMachine.configure(GameState.RESULT).onEntry(this.getGuid(), () => {
            this.isVisible = false
            this.isActive = false
        })
        BirdGame.stateMachine.configure(GameState.PAUSE).onEntry(this.getGuid(), () => {
            Time.isPaused = true
        })
        BirdGame.stateMachine.configure(GameState.PAUSE).onExit(this.getGuid(), () => {
            Time.isPaused = false
        })
    }

    private togglePause(): void {
        this.isPausing = !this.isPausing
        if (this.isPausing) {
            BirdGame.stateMachine.changeState(GameState.PAUSE)
            this.button.setDrawable(this.playSprite)
        } else {
            BirdGame.stateMachine.changeState(GameState.PLAY)
            this.button.setDrawable(this.pauseSprite)
        }
    }
}

export default PauseButton
