import Game from "../engine/system/Game.js";
import Bird from "./Bird.js";
import Wall from "./Wall.js";
import Vector from "../engine/types/Vector.js";
class BirdGame extends Game {
    static init(ctx) {
        super.init(ctx);
        let bird = new Bird("Main Bird");
        let leftWall = new Wall("Left Wall");
        leftWall.transform.position = new Vector(-200, 0);
        leftWall.collider.collisionStarted.subscribe(bird.turnRight.bind(bird));
        let rightWall = new Wall("Right Wall");
        rightWall.transform.position = new Vector(200, 0);
        rightWall.collider.collisionStarted.subscribe(bird.turnLeft.bind(bird));
    }
}
export default BirdGame;
//# sourceMappingURL=BirdGame.js.map