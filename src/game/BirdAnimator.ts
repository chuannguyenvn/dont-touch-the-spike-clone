import Node from '../engine/node/Node'
import Transform from '../engine/node/component/Transform'
import ComponentType from '../engine/node/component/ComponentType'
import Animator from '../engine/node/component/Animator'
import Sprite from '../engine/rendering/Sprite'
import { Resource, SpriteType } from '../engine/system/Resource'

export default class BirdAnimator extends Node {
    public transform: Transform
    public animator: Animator

    constructor(name: string) {
        super(name)

        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        const jumpSprite = Resource.getSprite(SpriteType.BIRD_JUMP)
        const glideSprite = Resource.getSprite(SpriteType.BIRD_GLIDE)
        this.animator = this.addComponent(ComponentType.ANIMATOR) as Animator
        this.animator.setSprites([jumpSprite, glideSprite])
        this.animator.framesPerSecond = 10
        this.animator.drawOrder = 100
    }
}