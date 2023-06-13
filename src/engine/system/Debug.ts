﻿import Canvas from "./Canvas/Canvas"

class Debug {
    public static _isDebugging: boolean
    public static _showFps: boolean = true
    
    public static _init(isDebugging: boolean, showFps: boolean) {
        Debug._isDebugging = isDebugging
        Debug._showFps = showFps

        Debug.log('Debug initialized.')
    }

    public static assert(condition: boolean, message: string): void {
        if (Debug._isDebugging) console.assert(condition, message)
    }

    public static log(message: string): void {
        if (Debug._isDebugging) console.log(message)
    }

    public static logError(message: string): void {
        if (Debug._isDebugging) console.error(message)
    }
}

export default Debug
