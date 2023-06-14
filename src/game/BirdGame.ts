import { ParamGameEvent } from '../engine/utility/Event'
import GameState from './GameState'
import Game from '../engine/Game'
import Time from '../engine/system/Time'
import Color from '../engine/math/Color'
import Vector from '../engine/math/Vector'
import HorizontalWall from './play/HorizontalWall'
import GameBackground from './GameBackground'
import { Title, TitleBottom } from './welcome/Title'
import Bird from './play/Bird'
import VerticalWall from './play/VerticalWall'
import ScoreBackground from './play/ScoreBackground'
import ScoreText from './play/ScoreText'
import PlayButton from './welcome/PlayButton'
import ResultBackground from './result/ResultBackground'
import ResultScore from './result/ResultScore'
import HighScore from './result/HighScore'
import RetryButton from './result/RetryButton'

class BirdGame extends Game {
    public static highScore = 0
    public static scoreChanged: ParamGameEvent<number> = new ParamGameEvent<number>()
    public static gameState: GameState = GameState.WELCOME
    public static gameStateChanged: ParamGameEvent<GameState> = new ParamGameEvent<GameState>()

    private static _currentScore = 0

    static get currentScore(): number {
        return BirdGame._currentScore
    }

    static set currentScore(value: number) {
        BirdGame._currentScore = value
        BirdGame.scoreChanged.invoke(value)
    }

    public static changeState(newState: GameState): void {
        BirdGame.gameState = newState
        BirdGame.gameStateChanged.invoke(newState)
    }

    public static stateChangeHandler(gameState: GameState): void {
        if (gameState === GameState.WELCOME) {
            BirdGame.currentScore = 0
        } else if (gameState === GameState.PLAY) {
            //
        } else if (gameState === GameState.RESULT) {
            if (BirdGame.highScore < BirdGame._currentScore)
                BirdGame.highScore = BirdGame._currentScore
        }
    }

    public static init(): void {
        BirdGame.gameStateChanged.subscribe(BirdGame.stateChangeHandler.bind(BirdGame))

        const gameBackground = new GameBackground('Game Background')
        gameBackground.start()

        const titleTop = new Title('Title')
        titleTop.start()

        const titleBottom = new TitleBottom('Title')
        titleBottom.start()

        const bird = new Bird('Main Bird')
        bird.start()

        const leftWall = new VerticalWall('Wall')
        leftWall.transform.globalPosition = new Vector(-250, 0)
        leftWall.start()

        const rightWall = new VerticalWall('Wall')
        rightWall.transform.globalPosition = new Vector(250, 0)
        rightWall.start()

        bird.touchedLeftWall.subscribe(() => {
            leftWall.hideSpike()
            rightWall.showSpike()
        })

        bird.touchedRightWall.subscribe(() => {
            rightWall.hideSpike()
            leftWall.showSpike()
        })

        const topWall = new HorizontalWall('Top Wall')
        topWall.transform.globalPosition = new Vector(0, 300)
        topWall.start()

        const bottomWall = new HorizontalWall('Bottom Wall')
        bottomWall.transform.globalPosition = new Vector(0, -300)
        bottomWall.start()

        const scoreBackground = new ScoreBackground('Score Background')
        scoreBackground.start()

        const scoreText = new ScoreText('Score Text')
        bird.scoreChanged.subscribe(scoreText.changeScore.bind(scoreText))
        scoreText.start()

        const playButton = new PlayButton('Play Button')
        playButton.start()

        const resultBackground = new ResultBackground('Result Background')
        resultBackground.start()

        const resultScore = new ResultScore('Result Score')
        resultScore.start()

        const highScore = new HighScore('High Score')
        highScore.start()

        const retryButton = new RetryButton('Retry Button')
        retryButton.start()

        BirdGame.changeState(GameState.WELCOME)
    }
}

export default BirdGame
