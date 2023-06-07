import Game from "../system/Game.js"
import Debug from "../system/Debug.js"
import Vector from "../types/Vector.js"

class Input
{
    private static lastKeyUpKey: string
    private static lastKeyDownKey: string
    private static lastMousePosition: Vector

    public static init(): void
    {
        const keyUpHandler = (event: KeyboardEvent): void =>
        {
            Input.lastKeyUpKey = event.key
        }

        const keyDownHandler = (event: KeyboardEvent): void =>
        {
            Input.lastKeyDownKey = event.key
        }

        const logMousePosition = (event: MouseEvent): void =>
        {
            if (event) Input.lastMousePosition = new Vector(event.clientX, event.clientY)
        }

        document.addEventListener('keyup', keyUpHandler, false)
        document.addEventListener('keydown', keyDownHandler, false)
        document.onmousemove = logMousePosition
    }

    public static resetInput(): void
    {
        Input.lastKeyUpKey = ""
        Input.lastKeyDownKey = ""
    }

    public static getKeyDown(key: string): boolean
    {
        return Input.lastKeyDownKey == key
    }

    public static getKeyUp(key: string): boolean
    {
        return Input.lastKeyUpKey == key
    }

    public static getMousePosition(): Vector
    {
        if (this.lastMousePosition)
            return this.lastMousePosition
        else
            return Vector.zero()
    }
}

export default Input