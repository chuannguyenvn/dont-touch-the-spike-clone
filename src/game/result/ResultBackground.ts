import Node from '../../engine/node/Node'
import Transform from '../../engine/node/component/Transform'
import Renderer from '../../engine/node/component/Renderer'
import ComponentType from '../../engine/node/component/ComponentType'
import RectangleShape from '../../engine/rendering/RectangleShape'
import Vector from '../../engine/math/Vector'
import Color from '../../engine/math/Color'
import BirdGame from '../BirdGame'
import GameState from '../GameState'
import Ease from '../../engine/utility/tween/Ease'

class ResultBackground extends Node {
    public transform: Transform
    public renderer: Renderer

    constructor(name: string) {
        super(name)

        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.transform.scale = new Vector(1, 0)
        
        const rectangle = new RectangleShape(new Vector(400, 150), new Color(0.5, 0.5, 0.5, 0.5))
        this.renderer = this.addComponent(ComponentType.RENDERER) as Renderer
        this.renderer.setDrawable(rectangle)
        this.renderer.drawOrder = 100

        this.isVisible = false
        this.isActive = false

        BirdGame.stateMachine.configure(GameState.RESULT).onEntry(this.getGuid(), () => {
            this.isVisible = true
            this.isActive = true
            this.transform.tweenScale(Vector.ONE, 0.5, 0, Ease.OUT_CUBIC, false)
        })

        BirdGame.stateMachine.configure(GameState.RESULT).onExit(this.getGuid(), () => {
            this.transform.tweenScale(new Vector(1, 0), 0.5, 0, Ease.IN_CUBIC, false, () => {
                this.isVisible = false
                this.isActive = false
            })
        })
    }
}

export default ResultBackground
