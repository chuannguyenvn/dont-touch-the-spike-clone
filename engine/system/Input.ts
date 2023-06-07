import Game from "./Game.js"
import Debug from "./Debug.js"
import Vector from "../types/Vector.js"
import Canvas from "./Canvas.js"

class Input
{
    private static _lastKeyUpKey: string
    private static _lastKeyDownKey: string
    private static _lastMousePosition: Vector

    public static _init(): void
    {
        const keyUpHandler = (event: KeyboardEvent): void =>
        {
            Input._lastKeyUpKey = event.key
        }

        const keyDownHandler = (event: KeyboardEvent): void =>
        {
            Input._lastKeyDownKey = event.key
        }

        const logMousePosition = (event: MouseEvent): void =>
        {
            if (event) Input._lastMousePosition = new Vector(event.clientX, event.clientY, 1)
        }

        document.addEventListener('keyup', keyUpHandler, false)
        document.addEventListener('keydown', keyDownHandler, false)
        document.onmousemove = logMousePosition
    }

    public static _resetInput(): void
    {
        Input._lastKeyUpKey = ""
        Input._lastKeyDownKey = ""
    }

    public static getKeyDown(key: string): boolean
    {
        return Input._lastKeyDownKey == key
    }

    public static getKeyUp(key: string): boolean
    {
        return Input._lastKeyUpKey == key
    }

    public static getMousePosition(): Vector
    {
        if (this._lastMousePosition)
            return Canvas._worldToCameraMatrix.inverse().multiplyVector(this._lastMousePosition)
        else
            return Vector.zero()
    }
}

export default Input