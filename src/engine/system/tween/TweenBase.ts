import Ease from './Ease'
import Time from '../Time'
import { GameEvent } from '../../utility/Event'
import TweenEngine from './TweenEngine'

class TweenBase {
    public evaluate: (x: number) => void
    public _startTime: number
    public _duration: number
    public _delay: number
    public _ease: Ease
    public _callback: () => void | null
    
    public _isStarted = false
    public tweenStarted: GameEvent = new GameEvent()
    public tweenEnded: GameEvent = new GameEvent()

    constructor(duration: number, delay: number, ease: Ease) {
        this._duration = duration
        this._delay = delay
        this._ease = ease
        TweenEngine._registerTween(this)
    }

    public _start(): void {
        this._isStarted = true
        this._startTime = Time.timeSinceGameStart()
        this.tweenStarted.invoke()
    }

    public end(): void {
        TweenEngine._unregisterTween(this)
        this.evaluate(1)
        this.tweenEnded.invoke()
        if (this._callback) this._callback()
    }

    public chain(tween: TweenBase): TweenBase {
        TweenEngine._unregisterTween(tween)
        this.tweenEnded.subscribe(tween._start)
        tween.tweenStarted.subscribe(() => TweenEngine._registerTween(tween))
        return tween
    }
}

export default TweenBase
