import Canvas from "../system/Canvas.js";
class Sprite {
    constructor(imagePath = "") {
        this.setImage(imagePath);
    }
    draw() {
        Canvas.canvasContext.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
    }
    setImage(imagePath) {
        this.image = new Image();
        this.image.src = imagePath;
    }
}
export default Sprite;
//# sourceMappingURL=Sprite.js.map