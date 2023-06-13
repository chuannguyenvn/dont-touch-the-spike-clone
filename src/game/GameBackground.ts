﻿import Node from '../engine/node/Node'
import Transform from '../engine/node/component/Transform'
import RectangleCollider from '../engine/node/component/RectangleCollider'
import Renderer from '../engine/node/component/Renderer'
import RectangleShape from '../engine/rendering/RectangleShape'
import ComponentType from '../engine/node/component/ComponentType'
import Color from '../engine/math/Color'
import BirdGame from './BirdGame'
import Canvas from '../engine/system/Canvas'
import ThemeManager from './ThemeManager'
import Ease from '../engine/utility/tween/Ease'

class GameBackground extends Node {
    public transform: Transform
    public collider: RectangleCollider
    public renderer: Renderer
    private rectangle: RectangleShape

    constructor(name: string) {
        super(name)

        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        this.rectangle = new RectangleShape(Canvas.canvasSize, Color.WHITE)
        this.renderer = this.addComponent(ComponentType.RENDERER) as Renderer
        this.renderer.setDrawable(this.rectangle)
        this.renderer.drawOrder = -100

        BirdGame.scoreChanged.subscribe(this.scoreChangedHandler.bind(this))
    }

    private scoreChangedHandler(score: number) {
        this.renderer.tweenColor(
            ThemeManager.getSecondaryColor(score),
            0.3,
            0,
            Ease.OUT_CUBIC,
            false
        )
    }
}

export default GameBackground
