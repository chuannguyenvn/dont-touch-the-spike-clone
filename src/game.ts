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

    public stateMachine: StateMachine<GameState> = new StateMachine<GameState>(GameState.NONE)

    protected initGame(): void {
        BirdGame.init()

        console.log('a')
        this.stateMachine
            .configure(GameState.WELCOME)
            .onEntry(1, () => console.log('entered welcome'))
        this.stateMachine.configure(GameState.RESULT).onExit(2, () => console.log('exited result'))
        this.stateMachine
            .configure(GameState.RESULT)
            .onEntry(3, () => console.log('entered result'))

        this.stateMachine.changeState(GameState.WELCOME)
        this.stateMachine.changeState(GameState.RESULT)
        this.stateMachine.changeState(GameState.WELCOME)
    }
}

enum GameState {
    NONE,
    WELCOME,
    PLAY,
    RESULT,
}

new Game()
