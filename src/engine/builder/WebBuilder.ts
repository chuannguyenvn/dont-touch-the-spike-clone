﻿import Builder from './Builder'
import CanvasBuildOptions from './build-options/CanvasBuildOptions'
import Canvas from '../system/Canvas'
import Debug from '../system/Debug'
import Time from '../system/Time'
import DebugBuildOptions from './build-options/DebugBuildOptions'
import { InputBuildOptions } from './build-options/InputBuildOptions'
import Input from '../system/Input'
import System from '../system/System'
import Sound from '../system/Sound'
import SoundBuildOptions from './build-options/SoundBuildOptions'
import Resource from '../system/Resource'

class WebBuilder extends Builder {
    private game: System

    constructor(game: System) {
        super()
        this.game = game
    }

    buildDebug(debugBuildOptions: DebugBuildOptions): void {
        Debug._init(debugBuildOptions.isDebugging, debugBuildOptions.showFps)
    }

    buildTime(): void {
        Time._init()
    }

    buildCanvas(canvasBuildOptions: CanvasBuildOptions): void {
        const game = document.getElementById('game')
        const canvas = document.createElement('canvas')
        canvas.id = 'canvas'
        canvas.width = canvasBuildOptions.canvasSize.x
        canvas.height = canvasBuildOptions.canvasSize.y
        game?.appendChild(canvas)

        const ctx = canvas.getContext('2d')
        if (ctx) {
            Canvas.backgroundColor = canvasBuildOptions.canvasColor
            Canvas._init(ctx, canvasBuildOptions.canvasSize)
        } else {
            Debug.logError('Canvas context not found.')
        }
    }

    buildInput(inputBuildOptions: InputBuildOptions): void {
        Input._init(inputBuildOptions)
    }

    buildSound(soundBuildOptions: SoundBuildOptions): void {
        Sound._init(soundBuildOptions.globalVolume)
    }

    buildSystem(): void {
        System._init()
    }

    loadResource(): void {
        Resource._init()
    }
}

export default WebBuilder
