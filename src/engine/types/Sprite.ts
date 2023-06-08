import Drawable from "./Drawable"
import Canvas from "../system/Canvas"
import Color from "./Color"
import Vector from "./Vector"

class Sprite implements Drawable
{
    public color: Color
    public drawOrder: number
    public maxWidth = 100
    public maxHeight = 100
    public flipX = false
    public flipY = false
    public scale: Vector = Vector.one()
    public offSet: Vector
    private _image: HTMLImageElement

    constructor(imagePath = "") {
        this.setImage(imagePath)
    }

    _draw() {
        Canvas._canvasContext.scale(this.scale.x * (this.flipX ? -1 : 1), this.scale.y * (this.flipY ? -1 : 1))
        Canvas._canvasContext.drawImage(this._image, -this._image.width / 2, -this._image.height / 2)
    }

    public setImage(imagePath: string): void {
        this._image = new Image()
        this._image.src = imagePath
    }

}

export default Sprite