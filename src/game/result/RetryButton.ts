import Vector from '../../engine/math/Vector'
import BirdGame from '../BirdGame'
import GameState from '../GameState'
import Resource from '../../engine/system/Resource'
import NineSliceType from '../../engine/configs-and-resources/NineSliceTypes'
import ButtonNode from '../../engine/premade/ButtonNode'
import Ease from '../../engine/utility/tween/Ease'
import NineSlice from "../../engine/rendering/NineSlice"

class RetryButton extends ButtonNode {
    constructor(name: string) {
        super(name, new NineSlice(NineSliceType.BUTTON_IDLE), new NineSlice(NineSliceType.BUTTON_HOVERED))

        this.transform.globalPosition = new Vector(0, -150)

        this.setButtonSize(new Vector(300, 100))

        this.isVisible = false
        this.isActive = false
        this.textContent.text = 'REPLAY'

        this.button.clicked.subscribe(this.changeToPlayState.bind(this))
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
