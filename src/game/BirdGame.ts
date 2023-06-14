import { ParamGameEvent } from '../engine/utility/Event'
import GameState from './GameState'
import Game from '../engine/Game'
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
import PauseButton from './play/PauseButton'
import StateMachine from '../engine/utility/StateMachine'

class BirdGame extends Game {
    public static highScore = 0
    public static scoreChanged: ParamGameEvent<number> = new ParamGameEvent<number>()
    private static _currentScore = 0
    public static stateMachine: StateMachine<GameState> = new StateMachine<GameState>(
        GameState.INIT
    )

    static get currentScore(): number {
        return BirdGame._currentScore
    }

    static set currentScore(value: number) {
        BirdGame._currentScore = value
        BirdGame.scoreChanged.invoke(value)
    }
    
    public static init(): void {
        BirdGame.stateMachine.configure(GameState.WELCOME).onEntry(-1, () => BirdGame.currentScore = 0)
        BirdGame.stateMachine.configure(GameState.RESULT).onEntry(-1, () => {
            if (BirdGame.highScore < BirdGame._currentScore)
                BirdGame.highScore = BirdGame._currentScore
        })

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

        const pauseButton = new PauseButton('Pause Button')
        pauseButton.start()

        const resultBackground = new ResultBackground('Result Background')
        resultBackground.start()

        const resultScore = new ResultScore('Result Score')
        resultScore.start()

        const highScore = new HighScore('High Score')
        highScore.start()

        const retryButton = new RetryButton('Retry Button')
        retryButton.start()

        BirdGame.stateMachine.changeState(GameState.WELCOME)
    }
}

export default BirdGame
