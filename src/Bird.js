import Node from "../engine/node/Node.js";
import ComponentType from "../engine/component/ComponentType.js";
import Sprite from "../engine/types/Sprite.js";
import Vector from "../engine/types/Vector.js";
import Input from "../engine/system/Input.js";
import Time from "../engine/system/Time.js";
import Maths from "../engine/utility/Maths.js";
class Bird extends Node {
    constructor() {
        super(...arguments);
        this.lastJumpTime = 0;
        this.isMovingRight = true;
        this.moveSpeed = 200;
        this.jumpCurveXCoeff = 3;
        this.jumpCurveYCoeff = 100;
    }
    init() {
        this.transform = this.addComponent(ComponentType.TRANSFORM);
        this.transform.position = new Vector(50, 100);
        this.lastJumpTime = Time.timeSinceGameStart();
        this.lastJumpPosY = this.transform.position.y;
        this.collider = this.addComponent(ComponentType.RECTANGLE_COLLIDER);
        this.collider.size = new Vector(20, 20);
        let sprite = new Sprite("./assets/kenney/Characters/character_0000.png");
        this.renderer = this.addComponent(ComponentType.RENDERER);
        this.renderer.setDrawable(sprite);
    }
    update() {
        this.move();
        if (Input.getKeyDown(' '))
            this.jump();
        let elapsedJumpTime = Time.timeSinceGameStart() - this.lastJumpTime;
        this.transform.position.y = this.jumpYFunction(elapsedJumpTime);
        this.transform.position.x = Maths.clamp(this.transform.position.x, -200, 200);
        this.transform.position.y = Maths.clamp(this.transform.position.y, -300, 300);
        console.log(elapsedJumpTime);
        console.log(this.jumpYFunction(elapsedJumpTime));
    }
    move() {
        if (this.isMovingRight) {
            this.transform.position.x += Time.deltaTime() * this.moveSpeed;
        }
        else {
            this.transform.position.x -= Time.deltaTime() * this.moveSpeed;
        }
    }
    turnLeft() {
        this.isMovingRight = false;
    }
    turnRight() {
        this.isMovingRight = true;
    }
    jump() {
        this.lastJumpTime = Time.timeSinceGameStart();
        this.lastJumpPosY = this.transform.position.y;
    }
    jumpYFunction(elapsedTime) {
        let x = elapsedTime * this.jumpCurveXCoeff;
        return (-(Math.pow(x - 1, 2)) + 1) * this.jumpCurveYCoeff + this.lastJumpPosY;
    }
}
export default Bird;
//# sourceMappingURL=Bird.js.map