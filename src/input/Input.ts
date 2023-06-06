import Game from "../system/Game.js"
import Debug from "../system/Debug.js"

class Input
{
    private static lastKeyUpKey: string
    private static lastKeyDownKey: string

    public static init(): void
    {
        const keyUpHandler = (event: KeyboardEvent) =>
        {
            Input.lastKeyUpKey = event.key
        }

        const keyDownHandler = (event: KeyboardEvent) =>
        {
            Input.lastKeyDownKey = event.key
        }

        document.addEventListener('keyup', keyUpHandler, false)
        document.addEventListener('keydown', keyDownHandler, false)
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
}

export default Input