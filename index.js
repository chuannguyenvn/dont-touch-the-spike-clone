import Game from "./src/system/Game.js"
import Input from "./src/input/Input.js"
import Actor from "./src/actor/Actor.js"
import Debug from "./src/system/Debug.js"
import Canvas from "./src/system/Canvas.js"
import ComponentType from "./src/component/ComponentType.js"
import Vector2 from "./src/types/Vector2.js"
import {GameEvent, ParamGameEvent} from "./src/types/Event.js"
import Ease from "./src/system/tween/Ease.js"
import Time from "./src/system/Time.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")


Time.init()
Input.init()
Canvas.init(ctx)
Game.init()

// let actor = new Actor()
// actor.addComponent(ComponentType.TRANSFORM)
// let sprite = actor.addComponent(ComponentType.SPRITE)
// let collider = actor.addComponent(ComponentType.RECTANGLE_COLLIDER)
// collider.size = new Vector2(10, 10)
// sprite.setImage("./assets/kenney/Characters/character_0007.png")
// actor.update = (deltaTime) => {
//     let transform = actor.getComponent(ComponentType.TRANSFORM)
//         transform.position = Input.getMousePosition().multiply(1, -1)
// }

let actor2 = new Actor()
actor2.addComponent(ComponentType.TRANSFORM)
let sprite2 = actor2.addComponent(ComponentType.SPRITE)
sprite2.setImage("./assets/kenney/Characters/character_0001.png")
let collider2 = actor2.addComponent(ComponentType.RECTANGLE_COLLIDER)
collider2.size = new Vector2(10, 10)
let transform2 = actor2.getComponent(ComponentType.TRANSFORM)
transform2.position = new Vector2(50, 200)

let toRight = transform2.tweenPosition(new Vector2(350, 200), 2, 0, Ease.IN_OUT_ELASTIC)
let down = transform2.tweenPosition(new Vector2(50, 350), 2, 0, Ease.IN_OUT_ELASTIC)
toRight.chain(down)
down.tweenStarted.subscribe(() => console.log('started'))
collider2.collisionStarted.subscribe(() => console.log('asdf'))