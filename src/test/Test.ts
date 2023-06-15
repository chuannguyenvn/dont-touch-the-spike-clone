import Game from '../engine/Game'
import Time from '../engine/system/Time'
import Color from '../engine/math/Color'
import Vector from '../engine/math/Vector'
import Renderer from '../engine/node/component/Renderer'
import ObjectPool from '../engine/utility/ObjectPool'
import Timer from '../engine/utility/Timer'
import Ease from '../engine/utility/tween/Ease'
import CollisionBackground from '../game/CollisionBackground'
import BirdAnimator from '../game/BirdAnimator'
import ComponentType from '../engine/node/component/ComponentType'
import CircleShape from '../engine/rendering/CircleShape'
import TextContent from '../engine/rendering/TextContent'
import UIText from '../engine/node/component/UIText'
import CircleCollider from '../engine/node/component/CircleCollider'
import Transform from '../engine/node/component/Transform'
import RectangleShape from '../engine/rendering/RectangleShape'
import RectangleCollider from '../engine/node/component/RectangleCollider'
import Node from '../engine/node/Node'
import Ball from './Ball'

class Test extends Game {
    public static init(): void {
        let activeObjectCount = 0
        const pool = new ObjectPool<Ball>(() => new Ball('Ball'), 500)
        new Timer(
            () => {
                const ball = pool.getObject()
                Test.spawnBall(ball)
                new Timer(() => {
                    ball.transform.tweenScale(Vector.ZERO, 1, 0, Ease.IN_SINE, false, () => {
                        pool.returnObject(ball)
                        activeObjectCount--
                    })
                }, 15)
                activeObjectCount++
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

        let circle = new CircleShape(30, Color.WHITE)
        const renderer = parentNode.addComponent(ComponentType.RENDERER) as Renderer
        renderer.setDrawable(circle)

        const textContent = new TextContent('Yo')
        textContent.font = '25px verdana'
        const text = childNode.addComponent(ComponentType.TEXT) as UIText
        text.setDrawable(textContent)
        text.drawOrder = 1000

        parentNode.update = () => {
            textContent.text = activeObjectCount.toString()
        }

        const circleCollider = parentNode.addComponent(
            ComponentType.CIRCLE_COLLIDER
        ) as CircleCollider
        circleCollider.radius = 30
        parentNode.addComponent(ComponentType.RIGIDBODY)

        circle = new CircleShape(50, Color.WHITE)
        const staticCircle = new Node('AAA')
        const staticCircleTransform = staticCircle.addComponent(
            ComponentType.TRANSFORM
        ) as Transform
        staticCircleTransform.globalPosition = new Vector(-200, -50)
        const staticCircleCollider = staticCircle.addComponent(
            ComponentType.CIRCLE_COLLIDER
        ) as CircleCollider
        staticCircleCollider.radius = 50
        const staticCircleRenderer = staticCircle.addComponent(ComponentType.RENDERER) as Renderer
        staticCircleRenderer.setDrawable(circle)

        const staticCircle2 = new Node('AAA')
        const staticCircle2Transform = staticCircle2.addComponent(
            ComponentType.TRANSFORM
        ) as Transform
        staticCircle2Transform.globalPosition = new Vector(200, -50)
        const staticCircle2Collider = staticCircle2.addComponent(
            ComponentType.CIRCLE_COLLIDER
        ) as CircleCollider
        staticCircle2Collider.radius = 50
        const staticCircle2Renderer = staticCircle2.addComponent(ComponentType.RENDERER) as Renderer
        staticCircle2Renderer.setDrawable(circle)

        const rectangle = new RectangleShape(new Vector(100, 100), Color.WHITE)
        const staticRectangle = new Node('AAA')
        const staticRectangleTransform = staticRectangle.addComponent(
            ComponentType.TRANSFORM
        ) as Transform
        staticRectangleTransform.globalPosition = new Vector(0, -150)
        staticRectangleTransform.rotation = 45
        const staticRectangleCollider = staticRectangle.addComponent(
            ComponentType.RECTANGLE_COLLIDER
        ) as RectangleCollider
        staticRectangleCollider.size = new Vector(100, 100)
        const staticRectangleRenderer = staticRectangle.addComponent(
            ComponentType.RENDERER
        ) as Renderer
        staticRectangleRenderer.setDrawable(rectangle)

        // const node = new Node('A')
        // node.addComponent(ComponentType.TRANSFORM)
        // ;(node.addComponent(ComponentType.RENDERER) as Renderer).setDrawable(
        //     new LineShape(
        //         [new Vector(0, 0), new Vector(100, 0), new Vector(100, 100)],
        //         Color.BLACK,
        //         10,
        //         [5, 15]
        //     )
        // )

        // const parent = new Node('Parent')
        // const child = new Node('Child')
        //
        // const parentTransform = parent.addComponent(ComponentType.TRANSFORM) as Transform
        // const childTransform = child.addComponent(ComponentType.TRANSFORM) as Transform
        //
        // (parent.addComponent(ComponentType.RENDERER) as Renderer).setDrawable(new Circle(10, Color.GREEN));
        // (child.addComponent(ComponentType.RENDERER) as Renderer).setDrawable(new Circle(10, Color.RED))
        //
        // console.log("Start setting parent")
        // parent.addChild(child)
        // console.log("End setting parent")
        //
        // parentTransform.globalPosition = new Vector(100, 100)
        // childTransform.localPosition = new Vector(-100, -100)
        // // childTransform.globalPosition = new Vector(100, 100)
        //
        // parent.update = () => {
        //     parentTransform.localPosition = Input.getMousePosition()
        //     console.log(parentTransform.localPosition)
        // }
        //
        // console.log(parentTransform.globalPosition)
        // console.log(childTransform.globalPosition)
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

export default Test
