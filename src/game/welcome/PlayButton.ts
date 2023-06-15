import Vector from '../../engine/math/Vector'
import BirdGame from '../BirdGame'
import GameState from '../GameState'
import ButtonNode from '../../engine/premade/ButtonNode'
import Resource from '../../engine/system/Resource'
import NineSliceType from '../../engine/configs-and-resources/NineSliceTypes'

class PlayButton extends ButtonNode {
    init(): void {
        super.init()

        this.transform.globalPosition = new Vector(0, -100)

        const buttonSprite = Resource.getNineSlice(NineSliceType.BUTTON_IDLE)
        buttonSprite.height = 100
        buttonSprite.width = 300
        this.button.setDrawable(buttonSprite)

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
            this.isVisible = true
            this.isActive = true
        })

        BirdGame.stateMachine.configure(GameState.WELCOME).onExit(this.getGuid(), () => {
            this.isVisible = false
            this.isActive = false
        })
    }

    private changeToPlayState(): void {
        BirdGame.stateMachine.changeState(GameState.PLAY)
    }
}

export default PlayButton
