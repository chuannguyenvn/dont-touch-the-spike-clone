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
import ResultBackground from "./ResultBackground"
import ResultScore from "./ResultScore"
import HighScore from "./HighScore"


class BirdGame extends Game
{
    public static currentScore: number = 0
    public static highScore: number = 0

    public static gameState: GameState = GameState.WELCOME
    public static gameStateChanged: ParamGameEvent<GameState> = new ParamGameEvent<GameState>()

    public static changeState(newState: GameState)
    {
        BirdGame.gameState = newState
        BirdGame.gameStateChanged.invoke(newState)
    }

    public static stateChangeHandler(gameState: GameState)
    {
        if (gameState === GameState.WELCOME)
        {
            this.currentScore = 0
        }
        else if (gameState === GameState.PLAY)
        {

        }

        else if (gameState === GameState.RESULT)
        {
            if (BirdGame.highScore < BirdGame.currentScore)
                BirdGame.highScore = BirdGame.currentScore
        }
    }

    public static init(ctx: CanvasRenderingContext2D)
    {
        super.init(ctx)

        BirdGame.gameStateChanged.subscribe(BirdGame.stateChangeHandler.bind(BirdGame))

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

        let resultBackground = new ResultBackground("Result Background")
        resultBackground.start()

        let resultScore = new ResultScore("Result Score")
        resultScore.start()

        let highScore = new HighScore("High Score")
        highScore.start()

        this.changeState(GameState.WELCOME)
    }
}


export default BirdGame