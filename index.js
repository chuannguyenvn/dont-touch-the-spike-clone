import Game from "./src/game.js"
import Input from "./src/input/Input.js"
import Actor from "./src/actor/Actor.js"
import Debug from "./src/Debug.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

Input.init()
Game.init(ctx)
let actor = new Actor()
actor.update = () => {
   if (Input.getKeyDown(" ")) Debug.log('asdf');
}
Game.registerUpdatable(actor)