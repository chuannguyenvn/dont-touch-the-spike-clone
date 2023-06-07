import Game from "./engine/system/Game.js"
import Input from "./engine/system/Input.js"
import Node from "./engine/node/Node.js"
import Debug from "./engine/system/Debug.js"
import Canvas from "./engine/system/Canvas.js"
import ComponentType from "./engine/component/ComponentType.js"
import {GameEvent, ParamGameEvent} from "./engine/types/Event.js"
import Ease from "./engine/system/tween/Ease.js"
import Time from "./engine/system/Time.js"
import Vector from "./engine/types/Vector.js"
import Matrix from "./engine/types/Matrix.js"
import Sprite from "./engine/types/Sprite.js"
import Rectangle from "./engine/types/Rectangle.js"
import Color from "./engine/types/Color.js"
import Circle from "./engine/types/Circle.js"
import Freeform from "./engine/types/Freeform.js"
import BirdGame from "./src/BirdGame.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

BirdGame.init(ctx)

// let node = new Node()
// node.addComponent(ComponentType.TRANSFORM)
// let sprite = node.addComponent(ComponentType.SPRITE)
// let collider = node.addComponent(ComponentType.RECTANGLE_COLLIDER)
// collider.size = new Vector2(10, 10)
// sprite.setImage("./assets/kenney/Characters/character_0007.png")
// node.update = (deltaTime) => {
//     let transform = node.getComponent(ComponentType.TRANSFORM)
//         transform.position = Input.getMousePosition().multiply(1, -1)
// }
// let actor2 = new Node()
// actor2.addComponent(ComponentType.TRANSFORM)
// let sprite2 = actor2.addComponent(ComponentType.RENDERER)
// let sprite = new Sprite("./assets/kenney/Characters/character_0001.png")
// sprite2.drawable = sprite
// let collider2 = actor2.addComponent(ComponentType.RECTANGLE_COLLIDER)
// collider2.size = new Vector(10, 10)
// let transform2 = actor2.getComponent(ComponentType.TRANSFORM)
// transform2.position = new Vector(0, 0)
// transform2.scale = new Vector(5, 5)
//
// let r = new Node('background')
// r.addComponent(ComponentType.TRANSFORM)
// let rect = new Rectangle(new Vector(300, 300), new Color(1, 0, 0))
// r.addComponent(ComponentType.RENDERER).setDrawable(rect)
//
// let circleNode = new Node("circle")
// circleNode.addComponent(ComponentType.TRANSFORM).position = new Vector(100, 100)
// let circle = new Circle(50, new Color(0, 1, 0))
// circleNode.addComponent(ComponentType.RENDERER).setDrawable(circle)
//
// console.log(new Color(1, 0, 0).toHex())
//
// let toRight = transform2.tweenPosition(new Vector(350, 200), 2, 0, Ease.IN_OUT_ELASTIC)
// let down = transform2.tweenPosition(new Vector(50, 350), 2, 0, Ease.IN_OUT_ELASTIC)
// toRight.chain(down)
//
// let freeformNode = new Node("freeform")
// freeformNode.addComponent(ComponentType.TRANSFORM)
// let freeform = new Freeform(new Color(0, 0, 1))
// freeform.setPoints([new Vector(0, 0), new Vector(100, 0), new Vector(100, 100)])
// freeformNode.addComponent(ComponentType.RENDERER).setDrawable(freeform)
