﻿import Drawable from './Drawable'
import Canvas from '../system/Canvas'
import Color from '../math/Color'
import Vector from '../math/Vector'
import Ease from '../utility/tween/Ease'
import Tween from '../utility/tween/Tween'
import Maths from '../math/Maths'

class Sprite implements Drawable {
    public color: Color
    public saturation = 70
    public drawOrder: number
    public width = 100
    public height = 100
    public flipX = false
    public flipY = false
    public scale: Vector = Vector.ONE
    public offSet: Vector = Vector.ZERO
    protected _image: HTMLImageElement

    constructor(imagePath: string) {
        this.setImage(imagePath)
    }

    public _draw() {
        Canvas._canvasContext.scale(
            this.scale.x * (this.flipX ? -1 : 1),
            this.scale.y * (this.flipY ? -1 : 1)
        )
        Canvas._canvasContext.drawImage(
            this._image,
            this.offSet.x - this._image.width / 2,
            this.offSet.y - this._image.height / 2
        )
        // Canvas._canvasContext.globalCompositeOperation = "saturation"
        // Canvas._canvasContext.fillStyle = `hsl(0,${this.saturation}%,50%)`
        // Canvas._canvasContext.fillRect(-this._image.width / 2, -this._image.height / 2, this._image.width, this._image.height);  // apply the comp filter
        // Canvas._canvasContext.globalCompositeOperation = "source-over"
    }

    public setImage(imagePath: string): void {
        this._image = new Image()
        this._image.src = imagePath
    }

    public tweenSaturation(
        to: number,
        duration: number,
        delay: number,
        ease: Ease,
        relative: boolean
    ): Tween<number> {
        const evaluate = (x: number) => {
            if (relative) to += tween._startValue
            this.saturation = Maths.lerpNumber(x, tween._startValue, to)
        }

        const tween = new Tween<number>(evaluate, () => this.saturation, duration, delay, ease)
        return tween
    }
}

export default Sprite
