import Node from '../../engine/node/Node'
import ComponentType from '../../engine/node/component/ComponentType'
import Renderer from '../../engine/node/component/Renderer'
import CircleShape from '../../engine/rendering/CircleShape'
import Color from '../../engine/math/Color'
import Transform from '../../engine/node/component/Transform'
import BirdGame from '../BirdGame'
import GameState from '../GameState'

class ScoreBackground extends Node {
    public transform: Transform
    public renderer: Renderer

    constructor(name: string) {
        super(name)

        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        const circle = new CircleShape(100, new Color(0.1, 0.1, 0.1, 0.15))
        this.renderer = this.addComponent(ComponentType.RENDERER) as Renderer
        this.renderer.setDrawable(circle)
        this.renderer.drawOrder = -2

        BirdGame.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))
    }

    private gameStateChangedHandler(gameState: GameState): void {
        if (gameState == GameState.PLAY) {
            this.isVisible = true
            this.isActive = true
        } else {
            this.isVisible = false
            this.isActive = false
        }
    }
}

export default ScoreBackground
