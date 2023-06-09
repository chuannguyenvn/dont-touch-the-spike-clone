import WebBuilder from './engine/builder/WebBuilder'
import DebugBuildOptions from './engine/builder/build-options/DebugBuildOptions'
import CanvasBuildOptions from './engine/builder/build-options/CanvasBuildOptions'
import Vector from './engine/math/Vector'
import { InputBuildOptions, InputOption } from './engine/builder/build-options/InputBuildOptions'
import Color from './engine/math/Color'
import SoundBuildOptions from './engine/builder/build-options/SoundBuildOptions'
import BirdGame from './game/BirdGame'

class Game {
    constructor() {
        this.buildGame()
        this.initGame()
    }

    protected buildGame(): void {
        const webBuilder = new WebBuilder(this)

        const debugBuildOptions = new DebugBuildOptions()
        debugBuildOptions.isDebugging = true
        debugBuildOptions.showFps = false
        webBuilder.buildDebug(debugBuildOptions)

        webBuilder.buildTime()

        const canvasBuildOptions = new CanvasBuildOptions()
        canvasBuildOptions.canvasSize = new Vector(400, 600)
        canvasBuildOptions.canvasColor = new Color(0.2, 0.2, 0.2, 1)
        webBuilder.buildCanvas(canvasBuildOptions)

        const inputBuildOptions = new InputBuildOptions()
        inputBuildOptions.inputOptions = [InputOption.KEYBOARD, InputOption.MOUSE]
        webBuilder.buildInput(inputBuildOptions)

        const soundBuildOptions = new SoundBuildOptions()
        soundBuildOptions.globalVolume = 1
        webBuilder.buildSound(soundBuildOptions)

        webBuilder.buildSystem()

        webBuilder.loadResource()
    }

    protected initGame(): void {
        BirdGame.init()
    }
}

new Game()
