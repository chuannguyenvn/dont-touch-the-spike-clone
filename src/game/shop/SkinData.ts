import Sprite from '../../engine/rendering/Sprite'
import Color from '../../engine/math/Color'
import Vector from "../../engine/math/Vector"

class SkinData {
    public name: string
    public jumpSprite: Sprite
    public glideSprite: Sprite
    public trailColor: Color
    public price: number

    constructor(name: string, jumpSprite: Sprite, glideSprite: Sprite, trailColor: Color, price: number) {
        this.name = name
        this.jumpSprite = jumpSprite
        this.glideSprite = glideSprite
        this.trailColor = trailColor
        this.price = price

        this.jumpSprite.scale = Vector.ONE.multiply(0.12)
        this.glideSprite.scale = Vector.ONE.multiply(0.12)
    }
}

export default SkinData
