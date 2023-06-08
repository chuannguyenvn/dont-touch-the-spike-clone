import Vector from "../types/Vector"
import Canvas from "./Canvas"
import MouseInteractable from "../component/MouseInteractable"

class Input
{
    private static _mouseInteractables: MouseInteractable[] = []
    
    private static _isMouseClickedLastFrame: boolean = false
    private static _lastKeyUpKey: string
    private static _lastKeyDownKey: string
    private static _lastMousePosition: Vector

    public static _init(): void
    {
        const mouseDownHandler = (event: MouseEvent): void =>
        {
            Input._isMouseClickedLastFrame = true
        }
        
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

        document.addEventListener('mousedown', mouseDownHandler, false)
        document.addEventListener('keyup', keyUpHandler, false)
        document.addEventListener('keydown', keyDownHandler, false)
        document.onmousemove = logMousePosition
    }

    public static _handleInput(): void
    {
        for (let i = 0; i < this._mouseInteractables.length; i++)
        {
            this._mouseInteractables[i]._click(Input.getMousePosition())
            this._mouseInteractables[i]._hover(Input.getMousePosition())
        }
    }
    
    public static _resetInput(): void
    {
        Input._isMouseClickedLastFrame = false
        Input._lastKeyUpKey = ""
        Input._lastKeyDownKey = ""
    }
    
    public static registerMouseInteractable(mouseInteractable: MouseInteractable): void
    {
        this._mouseInteractables.push(mouseInteractable)
    }

    public static getKeyDown(key: string): boolean
    {
        return Input._lastKeyDownKey == key
    }

    public static getKeyUp(key: string): boolean
    {
        return Input._lastKeyUpKey == key
    }

    public static getMouseDown():boolean
    {
        return Input._isMouseClickedLastFrame
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