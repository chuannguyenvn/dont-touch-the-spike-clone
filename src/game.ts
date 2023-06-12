import WebBuilder from './engine/builder/WebBuilder'
import DebugBuildOptions from './engine/builder/build-options/DebugBuildOptions'
import CanvasBuildOptions from './engine/builder/build-options/CanvasBuildOptions'
import Vector from './engine/math/Vector'
import { InputBuildOptions, InputOption } from './engine/builder/build-options/InputBuildOptions'
import StateMachine from './engine/utility/StateMachine'
import BirdGame from './game/BirdGame'

class Game {
    constructor() {
        this.buildGame()
        this.initGame()
    }

    protected buildGame(): void {
        const webBuilder = new WebBuilder(this)

        const debugBuildOptions = new DebugBuildOptions(true)
        webBuilder.buildDebug(debugBuildOptions)

        webBuilder.buildTime()
        const canvasBuildOptions = new CanvasBuildOptions(new Vector(400, 600))
        webBuilder.buildCanvas(canvasBuildOptions)

        const inputBuildOptions = new InputBuildOptions([InputOption.KEYBOARD, InputOption.MOUSE])
        webBuilder.buildInput(inputBuildOptions)

        webBuilder.buildSystem()
    }
    
    protected initGame(): void {
        BirdGame.init()
    }
}

enum GameState {
    NONE,
    WELCOME,
    PLAY,
    RESULT,
}

new Game()
