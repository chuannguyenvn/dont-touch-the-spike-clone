import Game from "../engine/system/Game.js";
import Bird from "./Bird.js";
import Wall from "./Wall.js";
import Vector from "../engine/types/Vector.js";
class BirdGame extends Game {
    static init(ctx) {
        super.init(ctx);
        let bird = new Bird("Main Bird");
        bird.start();
        let leftWall = new Wall("Wall");
        leftWall.transform.position = new Vector(-200, 0);
        leftWall.start();
        let rightWall = new Wall("Wall");
        rightWall.transform.position = new Vector(200, 0);
        rightWall.start();
        bird.touchedLeftWall.subscribe(() => {
            leftWall.hideSpike();
            rightWall.showSpike();
        });
        bird.touchedRightWall.subscribe(() => {
            rightWall.hideSpike();
            leftWall.showSpike();
        });
    }
}
export default BirdGame;
//# sourceMappingURL=BirdGame.js.map