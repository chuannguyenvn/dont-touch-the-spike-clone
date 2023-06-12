﻿import { ParamGameEvent } from '../engine/utility/Event'
import GameState from './GameState'
import Game from '../engine/Game'
import Ball from './Ball'
import CollisionBackground from './CollisionBackground'

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
        // BirdGame.gameStateChanged.subscribe(BirdGame.stateChangeHandler.bind(BirdGame))
        //
        // const gameBackground = new GameBackground('Game Background')
        // gameBackground.start()
        //
        // const titleTop = new Title('Title')
        // titleTop.start()
        //
        // const titleBottom = new TitleBottom('Title')
        // titleBottom.start()
        //
        // const bird = new Bird('Main Bird')
        // bird.start()
        //
        // const leftWall = new VerticalWall('Wall')
        // leftWall.transform.position = new Vector(-250, 0)
        // leftWall.start()
        //
        // const rightWall = new VerticalWall('Wall')
        // rightWall.transform.position = new Vector(250, 0)
        // rightWall.start()
        //
        // bird.touchedLeftWall.subscribe(() => {
        //     leftWall.hideSpike()
        //     rightWall.showSpike()
        // })
        //
        // bird.touchedRightWall.subscribe(() => {
        //     rightWall.hideSpike()
        //     leftWall.showSpike()
        // })
        //
        // const topWall = new HorizontalWall('Top Wall')
        // topWall.transform.position = new Vector(0, 300)
        // topWall.start()
        //
        // const bottomWall = new HorizontalWall('Bottom Wall')
        // bottomWall.transform.position = new Vector(0, -300)
        // bottomWall.start()
        //
        // const scoreBackground = new ScoreBackground('Score Background')
        // scoreBackground.start()
        //
        // const scoreText = new ScoreText('Score Text')
        // bird.scoreChanged.subscribe(scoreText.changeScore.bind(scoreText))
        // scoreText.start()
        //
        // const playButton = new PlayButton('Play Button')
        // playButton.start()
        //
        // const resultBackground = new ResultBackground('Result Background')
        // resultBackground.start()
        //
        // const resultScore = new ResultScore('Result Score')
        // resultScore.start()
        //
        // const highScore = new HighScore('High Score')
        // highScore.start()
        //
        // const retryButton = new RetryButton('Retry Button')
        // retryButton.start()
        //
        // BirdGame.changeState(GameState.WELCOME)

        new Ball('Ball')
        new Ball('Ball')
        new Ball('Ball')
        new Ball('Ball')
        new Ball('Ball')
        new Ball('Ball')
        new Ball('Ball')
        new Ball('Ball')
        new Ball('Ball')
        new Ball('Ball')
        new Ball('Ball')
        new Ball('Ball')
        new Ball('Ball')
        new Ball('Ball')
        new CollisionBackground('A')
    }
}

export default BirdGame
