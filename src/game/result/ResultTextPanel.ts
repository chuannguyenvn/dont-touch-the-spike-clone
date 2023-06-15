import PanelWithTextNode from '../../engine/premade/PanelWithTextNode'
import BirdGame from '../BirdGame'
import GameState from '../GameState'
import Vector from '../../engine/math/Vector'
import Ease from '../../engine/utility/tween/Ease'
import Resource from '../../engine/system/Resource'
import NineSliceType from '../../engine/configs-and-resources/NineSliceTypes'

class ResultTextPanel extends PanelWithTextNode {
    constructor(name: string) {
        super(name)

        this.transform.globalPosition = new Vector(0, 500)

        this.textContent.font = '30px tahoma'
        this.text.drawOrder = 1001
        this.textContent.lineHeight = 40

        const panel = Resource.getNineSlice(NineSliceType.BUTTON_IDLE)
        this.panel.setDrawable(panel)
        this.panel.drawOrder = 1000

        BirdGame.stateMachine.configure(GameState.RESULT).onEntry(this.getGuid(), () => {
            this.textContent.text = `SCORE: ${BirdGame.currentScore}\nHIGH SCORE: ${BirdGame.highScore}`
            this.transform.tweenPositionY(200, 0.5, 0.7, Ease.OUT_CUBIC, false)
        })

        BirdGame.stateMachine.configure(GameState.RESULT).onExit(this.getGuid(), () => {
            this.transform.tweenPositionY(500, 0.5, 0.5, Ease.OUT_CUBIC, false)
        })
    }

    public changeScore(score: number): void {
        this.textContent.text = score.toString()
    }
}

export default ResultTextPanel
