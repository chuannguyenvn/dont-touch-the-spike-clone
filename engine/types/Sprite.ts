import Drawable from "./Drawable.js"
import Canvas from "../system/Canvas.js"
import Color from "./Color.js"

class Sprite implements Drawable
{
    color: Color
    drawOrder: number
    private image: HTMLImageElement

    constructor(imagePath: string = "")
    {
        this.setImage(imagePath)
    }
    
    draw()
    {
        Canvas.canvasContext.drawImage(this.image, -this.image.width / 2, -this.image.height / 2)
    }

    public setImage(imagePath: string): void
    {
        this.image = new Image()
        this.image.src = imagePath
    }
}

export default Sprite