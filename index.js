﻿import Game from "./src/system/Game.js"
import Input from "./src/input/Input.js"
import Actor from "./src/actor/Actor.js"
import Debug from "./src/system/Debug.js"
import Canvas from "./src/system/Canvas.js"
import ComponentType from "./src/component/ComponentType.js"
import Vector2 from "./src/types/Vector2.js"
import {GameEvent, ParamGameEvent} from "./src/types/Event.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let gameEvent = new ParamGameEvent()
gameEvent.subscribe((d) => {console.log(d)})
Input.init()
Canvas.init(ctx)
Game.init()
let actor = new Actor()
actor.addComponent(ComponentType.TRANSFORM)
let sprite = actor.addComponent(ComponentType.SPRITE)
sprite.setImage("./assets/images/phaser-logo.png")
actor.update = (deltaTime) => {
    let transform = actor.getComponent(ComponentType.TRANSFORM)
    transform.position = new Vector2(50, 50)
    if (Input.getKeyDown(" ")) gameEvent.invoke(deltaTime)
}

let background = new Actor()
background.addComponent(ComponentType.TRANSFORM)
let sprite2 = background.addComponent(ComponentType.SPRITE)
sprite2.setImage("./assets/kenney/Characters/character_0007.png")
background.update = (deltaTime) => {
    let transform2 = background.getComponent(ComponentType.TRANSFORM)
    transform2.position = transform2.position.add(new Vector2(deltaTime * 100, 0))
}

