import Game from "./engine/system/Game"
import Bird from "./Bird"
import Wall from "./Wall"
import Vector from "./engine/types/Vector"
import PlayButton from "./PlayButton"
import Node from "./engine/node/Node"
import ComponentType from "./engine/component/ComponentType"
import Renderer from "./engine/component/Renderer"
import Circle from "./engine/types/Circle"
import Color from "./engine/types/Color"
import Transform from "./engine/component/Transform"

class BirdGame extends Game
{
    public static init(ctx: CanvasRenderingContext2D)
    {
        super.init(ctx)

        let bird = new Bird("Main Bird")
        bird.start()

        let leftWall = new Wall("Wall")
        leftWall.transform.position = new Vector(-250, 0)
        leftWall.start()

        let rightWall = new Wall("Wall")
        rightWall.transform.position = new Vector(250, 0)
        rightWall.start()

        bird.touchedLeftWall.subscribe(() =>
        {
            leftWall.hideSpike()
            rightWall.showSpike()
        })

        bird.touchedRightWall.subscribe(() =>
        {
            rightWall.hideSpike()
            leftWall.showSpike()
        })

        let playButton = new PlayButton("Play Button")
        playButton.start()
    }
}

export default BirdGame