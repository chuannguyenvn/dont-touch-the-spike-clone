import Game from "../engine/system/Game.js"
import Bird from "./Bird.js"
import Wall from "./Wall.js"
import Vector from "../engine/types/Vector.js"
import Node from "../engine/node/Node.js"
import ComponentType from "../engine/component/ComponentType.js"
import Button from "../engine/component/Button.js"
import Rectangle from "../engine/types/Rectangle.js"
import Color from "../engine/types/Color.js"
import {Alignment} from "../engine/component/UIElement.js"
import Transform from "../engine/component/Transform.js"
import PlayButton from "./PlayButton.js"

class BirdGame extends Game
{
    public static init(ctx: CanvasRenderingContext2D)
    {
        super.init(ctx)

        let bird = new Bird("Main Bird")
        bird.start()

        let leftWall = new Wall("Wall")
        leftWall.transform.position = new Vector(-200, 0)
        leftWall.start()

        let rightWall = new Wall("Wall")
        rightWall.transform.position = new Vector(200, 0)
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