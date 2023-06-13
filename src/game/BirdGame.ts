﻿import { ParamGameEvent } from '../engine/utility/Event'
import GameState from './GameState'
import Game from '../engine/Game'
import Ball from './Ball'
import CollisionBackground from './CollisionBackground'
import Time from '../engine/system/Time'
import Color from '../engine/math/Color'
import Vector from '../engine/math/Vector'
import Timer from '../engine/utility/Timer'
import ObjectPool from '../engine/utility/ObjectPool'
import Ease from '../engine/system/tween/Ease'
import Node from '../engine/node/Node'
import ComponentType from '../engine/node/component/ComponentType'
import TextContent from '../engine/rendering/TextContent'
import Text from '../engine/node/component/Text'
import Renderer from '../engine/node/component/Renderer'
import Circle from '../engine/rendering/Circle'
import CircleCollider from '../engine/node/component/CircleCollider'
import BirdAnimator from './BirdAnimator'
import Maths from '../engine/math/Maths'
import DrawLayer from '../engine/configs-and-resources/DrawLayers'
import CollisionLayers from '../engine/configs-and-resources/CollisionLayers'

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

        const pool = new ObjectPool<Ball>(() => new Ball('Ball'), 500)
        new Timer(
            () => {
                const ball = pool.getObject()
                BirdGame.spawnBall(ball)
                new Timer(() => {
                    ball.transform.tweenScale(Vector.ZERO, 1, 0, Ease.IN_SINE, false, () =>
                        pool.returnObject(ball)
                    )
                }, 15)
            },
            0,
            -1,
            0.05
        )

        new CollisionBackground('A')

        new BirdAnimator('Byrd')

        const parentNode = new Node('Yo')
        const childNode = new Node('AAAA')
        parentNode.addChild(childNode)

        const transform = parentNode.addComponent(ComponentType.TRANSFORM)
        const transform2 = childNode.addComponent(ComponentType.TRANSFORM)

        const circle = new Circle(30, Color.WHITE)
        const renderer = parentNode.addComponent(ComponentType.RENDERER) as Renderer
        renderer.setDrawable(circle)

        const textContent = new TextContent('Yo')
        const text = childNode.addComponent(ComponentType.TEXT) as Text
        text.setDrawable(textContent)
        text.drawOrder = 1000

        const circleCollider = parentNode.addComponent(
            ComponentType.CIRCLE_COLLIDER
        ) as CircleCollider
        circleCollider.radius = 30
        parentNode.addComponent(ComponentType.RIGIDBODY)
    }

    private static spawnBall(ball: Ball) {
        const hue = (Time.timeSinceGameStart() % 20) / 20

        ball.setPosition(Vector.UP.multiply(200))
        ball.setSize((Math.sin(Time.timeSinceGameStart() * 2.5) + 3) * 5)
        ball.setVelocity(
            Vector.ANGLE_UNIT(Math.sin(Time.timeSinceGameStart()) * 90 - 90).multiply(200)
        )

        ball.setColor(Color.fromHsv(hue, 0.6, 0.5))

        // ball.rigidbody.collisionLayer = CollisionLayers.IGNORE
        // const rand = Maths.randomRangeInt(0, 3)
        // if (rand === 0) {
        //     ball.setColor(Color.RED)
        //     ball.renderer.drawLayer = DrawLayer.RED
        // } else if (rand === 1) {
        //     ball.setColor(Color.GREEN)
        //     ball.renderer.drawLayer = DrawLayer.GREEN
        // } else {
        //     ball.setColor(Color.BLUE)
        //     ball.renderer.drawLayer = DrawLayer.BLUE
        // }
    }
}

export default BirdGame
