import Drawable from "./Drawable.js"
import Canvas from "../system/Canvas.js"
import Color from "./Color.js"

class Sprite implements Drawable
{
    private _image: HTMLImageElement

    public color: Color
    public drawOrder: number

    constructor(imagePath: string = "")
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