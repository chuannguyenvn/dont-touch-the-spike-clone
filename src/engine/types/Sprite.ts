import Drawable from "./Drawable"
import Canvas from "../system/Canvas"
import Color from "./Color"

class Sprite implements Drawable
{
    private _image: HTMLImageElement

    public color: Color
    public drawOrder: number

    constructor(imagePath = "")
    {
        this.setImage(imagePath)
    }
    
    _draw()
    {
        Canvas._canvasContext.drawImage(this._image, -this._image.width / 2, -this._image.height / 2)
    }

    public setImage(imagePath: string): void
    {
        this._image = new Image()
        this._image.src = imagePath
    }
}

export default Sprite