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

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")


Time.init()
Input.init()
Canvas.init(ctx)
Game.init()

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

let actor2 = new Node()
actor2.addComponent(ComponentType.TRANSFORM)
let sprite2 = actor2.addComponent(ComponentType.SPRITE)
sprite2.setImage("./assets/kenney/Characters/character_0001.png")
let collider2 = actor2.addComponent(ComponentType.RECTANGLE_COLLIDER)
collider2.size = new Vector(10, 10)
let transform2 = actor2.getComponent(ComponentType.TRANSFORM)
transform2.position = new Vector(50, 200)

let toRight = transform2.tweenPosition(new Vector(350, 200), 2, 0, Ease.IN_OUT_ELASTIC)
let down = transform2.tweenPosition(new Vector(50, 350), 2, 0, Ease.IN_OUT_ELASTIC)
toRight.chain(down)
down.tweenStarted.subscribe(() => console.log('started'))
collider2.collisionStarted.subscribe(() => console.log('asdf'))