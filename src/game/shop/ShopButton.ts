import ButtonNode from '../../engine/premade/ButtonNode'
import Vector from '../../engine/math/Vector'
import NineSliceType from '../../engine/configs-and-resources/NineSliceTypes'
import BirdGame from '../BirdGame'
import GameState from '../GameState'
import NineSlice from '../../engine/rendering/NineSlice'
import Ease from '../../engine/utility/tween/Ease'

class ShopButton extends ButtonNode {
    constructor(name: string) {
        super(
            name,
            new NineSlice(NineSliceType.BUTTON_IDLE),
            new NineSlice(NineSliceType.BUTTON_HOVERED)
        )

        this.transform.globalPosition = new Vector(0, -187.5)

        this.setButtonSize(new Vector(300, 50))

        this.isVisible = false
        this.isActive = false
        this.textContent.text = 'SHOP'
        this.textContent.font = '20px tahoma'
        this.button.drawOrder = 100
        this.text.drawOrder = 101
        
        this.button.clicked.subscribe(() => BirdGame.stateMachine.changeState(GameState.SHOP))
        BirdGame.stateMachine.configure(GameState.WELCOME).onEntry(this.getGuid(), () => {
            this.transform.globalPosition = new Vector(0, -187.5)
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
}

export default ShopButton
