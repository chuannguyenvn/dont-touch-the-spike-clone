import {GameEvent, ParamGameEvent} from '../engine/utility/Event'
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
import HighScore from './result/HighScore'
import RetryButton from './result/RetryButton'
import PauseButton from './play/PauseButton'
import StateMachine from '../engine/utility/StateMachine'
import ResultTextPanel from './result/ResultTextPanel'
import Shop from './shop/Shop'
import SkinType from './shop/SkinType'
import ShopButton from './shop/ShopButton'
import SkinData from './shop/SkinData'

class BirdGame extends Game {
    public static highScore = 0
    public static scoreChanged: ParamGameEvent<number> = new ParamGameEvent<number>()
    public static stateMachine: StateMachine<GameState> = new StateMachine<GameState>(
        GameState.INIT
    )

    private static _currentScore = 0

    static get currentScore(): number {
        return BirdGame._currentScore
    }

    static set currentScore(value: number) {
        BirdGame._currentScore = value
        BirdGame.scoreChanged.invoke(value)
    }

    private static _candyCount: number = 0

    static get candyCount(): number
    {
        return this._candyCount
    }

    static set candyCount(value: number)
    {
        this._candyCount = value
        BirdGame.candyCountChanged.invoke(value)
    }
    
    public static candyCountChanged: ParamGameEvent<number> = new ParamGameEvent<number>()
    
    public static currentSkin: SkinData
    public static unlockedSkins: SkinType[] = [SkinType.DEFAULT]

    public static init(): void {
        BirdGame.stateMachine
            .configure(GameState.WELCOME)
            .onEntry(-1, () => (BirdGame.currentScore = 0))
        BirdGame.stateMachine.configure(GameState.RESULT).onEntry(-1, () => {
            if (BirdGame.highScore < BirdGame._currentScore)
                BirdGame.highScore = BirdGame._currentScore
        })

        const shop = new Shop('Shop')
        shop.start()
        
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
        topWall.transform.globalPosition = new Vector(0, 400)
        topWall.start()

        const bottomWall = new HorizontalWall('Bottom Wall')
        bottomWall.transform.globalPosition = new Vector(0, -400)
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

        const resultTextPanel = new ResultTextPanel('Result')
        bird.scoreChanged.subscribe(resultTextPanel.changeScore.bind(resultTextPanel))

        const highScore = new HighScore('High Score')
        highScore.start()

        const retryButton = new RetryButton('Retry Button')
        retryButton.start()

        BirdGame.stateMachine.changeState(GameState.WELCOME)
    }
}

export default BirdGame
