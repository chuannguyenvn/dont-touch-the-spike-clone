import Wall from './Wall'
import Spike from './Spike'
import Vector from '../../engine/math/Vector'
import Renderer from '../../engine/node/component/Renderer'
import ComponentType from '../../engine/node/component/ComponentType'
import Rectangle from '../../engine/rendering/Rectangle'
import Color from '../../engine/math/Color'
import Maths from '../../engine/math/Maths'
import ThemeManager from '../ThemeManager'
import Drawable from '../../engine/rendering/Drawable'
import BirdGame from '../BirdGame'
import Ease from '../../engine/system/tween/Ease'

class HorizontalWall extends Wall {
    private renderer: Renderer
    private rectangle: Drawable

    constructor(name: string) {
        super(name)
        this.collider.size = new Vector(400, 100)

        this.renderer = this.addComponent(ComponentType.RENDERER) as Renderer
        this.renderer.drawOrder = 100
        this.rectangle = new Rectangle(new Vector(400, 100), Color.GREY)
        this.renderer.setDrawable(this.rectangle)

        BirdGame.scoreChanged.subscribe(this.scoreChangedHandler.bind(this))
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
    }

    private scoreChangedHandler(score: number): void {
        this.renderer.tweenColor(ThemeManager.getPrimaryColor(score), 0.3, 0, Ease.OUT_CUBIC, false)
    }
}

export default HorizontalWall
