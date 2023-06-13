import ComponentType from './ComponentType'
import Node from '../Node'
import Sprite from '../../rendering/Sprite'
import Renderer from './Renderer'

class Animator extends Renderer {
    // COMPONENT METADATA //
    public readonly type: ComponentType = ComponentType.ANIMATOR
    public readonly _componentRequirements: ComponentType[] = []

    // COMPONENT PROPERTIES //
    private sprites: Sprite[]
    private currentIndex: number = 0
    private frameCountdown: number
    private frameTime: number

    constructor(owner: Node) {
        super(owner)
    }

    get secondsPerFrame(): number {
        return this.frameTime
    }

    set secondsPerFrame(value: number) {
        this.frameTime = value
        this.frameCountdown = this.frameTime
    }

    get framesPerSecond(): number {
        return 1 / this.frameTime
    }

    set framesPerSecond(value: number) {
        this.frameTime = 1 / value
        this.frameCountdown = this.frameTime
    }

    public setSprites(sprites: Sprite[]) {
        this.sprites = sprites
        this.currentIndex = 0
        this.setDrawable(this._getNextSprite())
    }

    public override _draw(deltaTime: number): void {
        super._draw(deltaTime)

        if (this.frameCountdown > 0) {
            this.frameCountdown -= deltaTime
            return
        }

        this.setDrawable(this._getNextSprite())
        this.frameCountdown = this.frameTime
    }

    private _getNextSprite(): Sprite {
        const index = this.currentIndex
        this.currentIndex = (this.currentIndex + 1) % this.sprites.length
        return this.sprites[index]
    }
}

export default Animator
