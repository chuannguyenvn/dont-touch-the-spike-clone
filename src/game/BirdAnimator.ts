import Node from '../engine/node/Node'
import Transform from '../engine/node/component/Transform'
import ComponentType from '../engine/node/component/ComponentType'
import Animator from '../engine/node/component/Animator'
import Resource from '../engine/system/Resource'
import SpriteType from '../engine/configs-and-resources/SpriteTypes'
import Vector from '../engine/math/Vector'

class BirdAnimator extends Node {
    public transform: Transform
    public animator: Animator

    constructor(name: string) {
        super(name)

        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.transform.globalPosition = Vector.LEFT.multiply(500)
        
        const jumpSprite = Resource.getSprite(SpriteType.BIRD_JUMP)
        const glideSprite = Resource.getSprite(SpriteType.BIRD_GLIDE)
        jumpSprite.scale = Vector.ONE.multiply(0.3)
        glideSprite.scale = Vector.ONE.multiply(0.3)
        this.animator = this.addComponent(ComponentType.ANIMATOR) as Animator
        this.animator.setSprites([jumpSprite, glideSprite])
        this.animator.framesPerSecond = 10
        this.animator.drawOrder = 100
    }
}

export default BirdAnimator
