import Canvas from "../system/Canvas.js";
class Sprite {
    constructor(imagePath = "") {
        this.setImage(imagePath);
    }
    _draw() {
        Canvas._canvasContext.drawImage(this._image, -this._image.width / 2, -this._image.height / 2);
    }
    setImage(imagePath) {
        this._image = new Image();
        this._image.src = imagePath;
    }
}
export default Sprite;
//# sourceMappingURL=Sprite.js.map