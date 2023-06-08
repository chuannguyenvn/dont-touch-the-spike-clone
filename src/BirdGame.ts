import Game from "./engine/system/Game"
import Bird from "./Bird"
import Vector from "./engine/types/Vector"
import PlayButton from "./PlayButton"
import VerticalWall from "./VerticalWall"
import HorizontalWall from "./HorizontalWall"
import ScoreText from "./ScoreText"
import ScoreBackground from "./ScoreBackground"
import {ParamGameEvent} from "./engine/types/Event"
import GameState from "./GameState"


class BirdGame extends Game
{
    public static gameState: GameState = GameState.WELCOME
    public static gameStateChanged: ParamGameEvent<GameState> = new ParamGameEvent<GameState>()

    public static changeState(newState: GameState)
    {
        BirdGame.gameState = newState
        BirdGame.gameStateChanged.invoke(newState)
    }

    public static init(ctx: CanvasRenderingContext2D)
    {
        super.init(ctx)

        let bird = new Bird("Main Bird")
        bird.start()

        let leftWall = new VerticalWall("Wall")
        leftWall.transform.position = new Vector(-250, 0)
        leftWall.start()

        let rightWall = new VerticalWall("Wall")
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

        let topWall = new HorizontalWall("Wall")
        topWall.transform.position = new Vector(0, 300)
        topWall.start()

        let bottomWall = new HorizontalWall("Wall")
        bottomWall.transform.position = new Vector(0, -300)
        bottomWall.start()

        let scoreBackground = new ScoreBackground("Score Background")
        scoreBackground.start()

        let scoreText = new ScoreText("Score Text")
        bird.scoreChanged.subscribe(scoreText.changeScore.bind(scoreText))
        scoreText.start()

        let playButton = new PlayButton("Play Button")
        playButton.start()
        
        this.changeState(GameState.WELCOME)
    }
}


export default BirdGame