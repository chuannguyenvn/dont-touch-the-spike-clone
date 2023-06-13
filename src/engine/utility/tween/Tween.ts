﻿import Ease from './Ease'
import Vector from '../../math/Vector'
import TweenBase from './TweenBase'
import Color from '../../math/Color'

class Tween<T extends number | Vector | Color> extends TweenBase {
    public _retrieveStartValue: () => T
    public _startValue: T

    constructor(
        evaluateFunction: (x: number) => void,
        retrieveStartValue: () => T,
        duration: number,
        delay: number,
        ease: Ease
    ) {
        super(duration, delay, ease)
        this.evaluate = evaluateFunction
        this._retrieveStartValue = retrieveStartValue
        this._start = this._start.bind(this)
    }

    public _start() {
        this._startValue = this._retrieveStartValue()
        super._start()
    }
}

export default Tween
