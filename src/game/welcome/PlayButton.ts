import Vector from '../../engine/math/Vector'
import BirdGame from '../BirdGame'
import GameState from '../GameState'
import ButtonNode from '../../engine/premade/ButtonNode'
import Resource from '../../engine/system/Resource'
import NineSliceType from '../../engine/configs-and-resources/NineSliceTypes'
import Ease from '../../engine/utility/tween/Ease'

class PlayButton extends ButtonNode {
    init(): void {
        super.init()
        
        const buttonSprite = Resource.getNineSlice(NineSliceType.BUTTON_IDLE)
        buttonSprite.height = 100
        buttonSprite.width = 300
        this.button.setDrawable(buttonSprite)
        this.button.drawOrder = 100
        this.text.drawOrder = 101
        this.button.elementSize = new Vector(300, 100)

        this.isVisible = false
        this.isActive = false
        this.textContent.text = 'PLAY'

        this.button.clicked.subscribe(this.changeToPlayState.bind(this))
        this.button.hovered.subscribe(() => {
            const buttonSprite = Resource.getNineSlice(NineSliceType.BUTTON_HOVERED)
            buttonSprite.height = 100
            buttonSprite.width = 300
            this.button.setDrawable(buttonSprite)
        })
        this.button.unhovered.subscribe(() => {
            const buttonSprite = Resource.getNineSlice(NineSliceType.BUTTON_IDLE)
            buttonSprite.height = 100
            buttonSprite.width = 300
            this.button.setDrawable(buttonSprite)
        })

        this.button.clicked.subscribe(this.changeToPlayState.bind(this))
        BirdGame.stateMachine.configure(GameState.WELCOME).onEntry(this.getGuid(), () => {
            this.transform.globalPosition = new Vector(0, -125)
            this.isVisible = true
            this.isActive = true
        })

        BirdGame.stateMachine.configure(GameState.WELCOME).onExit(this.getGuid(), () => {
            this.transform.tweenPositionY(-500, 0.5, 0, Ease.OUT_CUBIC, false, () => {
                this.isVisible = false
                this.isActive = false
            })
        })
    }

    private changeToPlayState(): void {
        BirdGame.stateMachine.changeState(GameState.PLAY)
    }
}

export default PlayButton
