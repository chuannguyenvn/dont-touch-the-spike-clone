import Wall from './Wall'
import Spike from './Spike'
import Vector from '../../engine/math/Vector'
import Renderer from '../../engine/node/component/Renderer'
import ComponentType from '../../engine/node/component/ComponentType'
import RectangleShape from '../../engine/rendering/RectangleShape'
import Color from '../../engine/math/Color'
import Maths from '../../engine/math/Maths'
import ThemeManager from '../ThemeManager'
import Drawable from '../../engine/rendering/Drawable'
import BirdGame from '../BirdGame'
import Ease from '../../engine/utility/tween/Ease'
import GameState from '../GameState'

class HorizontalWall extends Wall {
    private renderer: Renderer
    private rectangle: Drawable

    private startYPos: number

    constructor(name: string) {
        super(name)
        this.collider.size = new Vector(400, 100)

        this.renderer = this.addComponent(ComponentType.RENDERER) as Renderer
        this.renderer.drawOrder = 100
        this.rectangle = new RectangleShape(new Vector(400, 1000), Color.GREY)
        this.renderer.setDrawable(this.rectangle)

        BirdGame.scoreChanged.subscribe(this.scoreChangedHandler.bind(this))

        BirdGame.stateMachine.configure(GameState.RESULT).onEntry(this.getGuid(), () => {
            this.transform.tweenPositionY(0, 1, 0, Ease.OUT_CUBIC, false)
        })

        BirdGame.stateMachine.configure(GameState.WELCOME).onEntry(this.getGuid(), () => {
            this.transform.tweenPositionY(this.startYPos, 1, 0, Ease.IN_CUBIC, false)
        })
    }

    public start(): void {
        for (let x = -200; x <= 200; x += 50) {
            const spike = new Spike('Spike')
            spike.setParent(this)

            const spikeXPos = x
            const spikeYPos = Maths.sign(this.transform.globalPosition.y) * 250
            spike.transform.globalPosition = new Vector(spikeXPos, spikeYPos)
            spike.start()

            this.spikes.push(spike)
        }

        this.startYPos = this.transform.globalPosition.y
        console.log(this.startYPos)
    }

    private scoreChangedHandler(score: number): void {
        this.renderer.tweenColor(ThemeManager.getPrimaryColor(score), 0.3, 0, Ease.OUT_CUBIC, false)
    }
}

export default HorizontalWall
