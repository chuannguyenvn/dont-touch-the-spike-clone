import WebBuilder from './engine/builder/WebBuilder'
import DebugBuildOptions from './engine/builder/build-options/DebugBuildOptions'
import CanvasBuildOptions from './engine/builder/build-options/CanvasBuildOptions'
import Vector from './engine/math/Vector'
import { InputBuildOptions, InputOption } from './engine/builder/build-options/InputBuildOptions'
import BirdGame from './game/BirdGame'
import Color from './engine/math/Color'

class Game {
    constructor() {
        this.buildGame()
        this.initGame()
    }

    protected buildGame(): void {
        const webBuilder = new WebBuilder(this)

        const debugBuildOptions = new DebugBuildOptions()
        debugBuildOptions.isDebugging = true
        debugBuildOptions.showFps = true
        webBuilder.buildDebug(debugBuildOptions)

        webBuilder.buildTime()

        const canvasBuildOptions = new CanvasBuildOptions()
        canvasBuildOptions.canvasSize = new Vector(1300, 800)
        canvasBuildOptions.canvasColor = new Color(0.2, 0.2, 0.2, 1)
        webBuilder.buildCanvas(canvasBuildOptions)

        const inputBuildOptions = new InputBuildOptions()
        inputBuildOptions.inputOptions = [InputOption.KEYBOARD, InputOption.MOUSE]
        webBuilder.buildInput(inputBuildOptions)

        webBuilder.buildSound()
        
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
