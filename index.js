import Game from "./src/system/Game.js"
import Input from "./src/input/Input.js"
import Actor from "./src/actor/Actor.js"
import Debug from "./src/system/Debug.js"
import Canvas from "./src/system/Canvas.js"
import ComponentType from "./src/component/ComponentType.js"
import Vector2 from "./src/types/Vector2.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

Input.init()
Canvas.init(ctx)
Game.init()
let actor = new Actor()
actor.addComponent(ComponentType.TRANSFORM)
let sprite = actor.addComponent(ComponentType.SPRITE)
sprite.setImage("./assets/images/phaser-logo.png")
actor.update = () => {
    let transform = actor.getComponent(ComponentType.TRANSFORM)
    transform.position = new Vector2(50, 50)
    if (Input.getKeyDown(" ")) Debug.log('asdf')
}
Game.registerUpdatable(actor)

