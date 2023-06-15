import Vector from '../math/Vector'
import Canvas from './Canvas'
import MouseInteractable from '../node/component/MouseInteractable'
import { InputBuildOptions } from '../builder/build-options/InputBuildOptions'
import Debug from './Debug'

class Input {
    private static _mouseInteractables: MouseInteractable[] = []

    private static _isMouseClickedLastFrame = false
    private static _lastKeyUpKey: string
    private static _lastKeyDownKey: string
    private static _lastMousePosition: Vector

    public static _init(inputBuildOptions: InputBuildOptions): void {
        const mouseDownHandler = (event: MouseEvent): void => {
            Input._isMouseClickedLastFrame = true
        }

        const keyUpHandler = (event: KeyboardEvent): void => {
            Input._lastKeyUpKey = event.key
        }

        const keyDownHandler = (event: KeyboardEvent): void => {
            Input._lastKeyDownKey = event.key
        }

        const logMousePosition = (event: MouseEvent): void => {
            if (event) Input._lastMousePosition = new Vector(event.clientX, event.clientY, 1)
        }

        document.addEventListener('mousedown', mouseDownHandler, false)
        document.addEventListener('keyup', keyUpHandler, false)
        document.addEventListener('keydown', keyDownHandler, false)
        document.onmousemove = logMousePosition

        Debug.log('Input initialized.')
    }

    public static _handleInput(): void {
        for (let i = 0; i < this._mouseInteractables.length; i++) {
            if (!this._mouseInteractables[i].owner.isActive) continue

            this._mouseInteractables[i]._checkClick(Input.getMousePosition())
            this._mouseInteractables[i]._checkHover(Input.getMousePosition())
        }
    }

    public static _resetInput(): void {
        Input._isMouseClickedLastFrame = false
        Input._lastKeyUpKey = ''
        Input._lastKeyDownKey = ''
    }

    public static registerMouseInteractable(mouseInteractable: MouseInteractable): void {
        this._mouseInteractables.push(mouseInteractable)
    }

    public static getKeyDown(key: string): boolean {
        return Input._lastKeyDownKey == key
    }

    public static getKeyUp(key: string): boolean {
        return Input._lastKeyUpKey == key
    }

    public static getMouseDown(): boolean {
        return Input._isMouseClickedLastFrame
    }

    public static getMousePosition(): Vector {
        if (this._lastMousePosition)
            return Canvas._worldToCameraMatrix.inverse().multiplyVector(this._lastMousePosition)
        else return Vector.ZERO
    }
}

export default Input
