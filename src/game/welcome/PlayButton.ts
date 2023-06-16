import Vector from '../../engine/math/Vector'
import BirdGame from '../BirdGame'
import GameState from '../GameState'
import ButtonNode from '../../engine/premade/ButtonNode'
import NineSliceType from '../../engine/configs-and-resources/NineSliceTypes'
import Ease from '../../engine/utility/tween/Ease'
import NineSlice from '../../engine/rendering/NineSlice'

class PlayButton extends ButtonNode {
    constructor(name: string) {
        super(
            name,
            new NineSlice(NineSliceType.BUTTON_IDLE),
            new NineSlice(NineSliceType.BUTTON_HOVERED)
        )
        
        this.setButtonSize(new Vector(300, 75))
        this.button.drawOrder = 100
        this.text.drawOrder = 101

        this.isVisible = false
        this.isActive = false
        this.textContent.text = 'PLAY'

        this.button.clicked.subscribe(this.changeToPlayState.bind(this))
        BirdGame.stateMachine.configure(GameState.WELCOME).onEntry(this.getGuid(), () => {
            this.transform.globalPosition = new Vector(0, -112.5)
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
