import Vector from '../../engine/math/Vector'
import BirdGame from '../BirdGame'
import GameState from '../GameState'
import Resource from '../../engine/system/Resource'
import NineSliceType from '../../engine/configs-and-resources/NineSliceTypes'
import ButtonNode from '../../engine/premade/ButtonNode'
import Ease from '../../engine/utility/tween/Ease'

class RetryButton extends ButtonNode {
    init(): void {
        super.init()

        this.transform.globalPosition = new Vector(0, -150)

        const buttonSprite = Resource.getNineSlice(NineSliceType.BUTTON_IDLE)
        buttonSprite.height = 100
        buttonSprite.width = 300
        this.button.setDrawable(buttonSprite)

        this.isVisible = false
        this.isActive = false
        this.textContent.text = 'REPLAY'

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
        BirdGame.stateMachine.configure(GameState.RESULT).onEntry(this.getGuid(), () => {
            this.transform.globalPosition = new Vector(0, -500)
            this.transform.tweenPositionY(-200, 0.5, 0.7, Ease.OUT_CUBIC, false)
            this.isVisible = true
            this.isActive = true
        })

        BirdGame.stateMachine.configure(GameState.RESULT).onExit(this.getGuid(), () => {
            this.isVisible = false
            this.isActive = false
        })
    }

    private changeToPlayState(): void {
        BirdGame.stateMachine.changeState(GameState.WELCOME)
    }
}

export default RetryButton
