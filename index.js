import Game from "./src/game.js"
import Actor from "./src/actor/Actor.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

Game.init(ctx)
let actor = new Actor()
Game.registerUpdatable(actor)