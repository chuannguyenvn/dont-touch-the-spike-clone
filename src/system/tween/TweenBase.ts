import Ease from "./Ease.js"
import Time from "../Time.js"
import {GameEvent} from "../../types/Event.js"
import TweenEngine from "./TweenEngine.js"

class TweenBase
{
    public evaluate: (x: number) => void
    public startTime: number
    public duration: number
    public delay: number
    public ease: Ease

    public isStarted: boolean = false
    public tweenStarted: GameEvent = new GameEvent()
    public tweenEnded: GameEvent = new GameEvent()

    constructor(duration: number, delay: number, ease: Ease)
    {
        this.duration = duration
        this.delay = delay
        this.ease = ease
        TweenEngine.registerTween(this)
    }

    public start()
    {
        this.isStarted = true
        this.startTime = Time.timeSinceGameStart()
        this.tweenStarted.invoke()
    }

    public end()
    {
        TweenEngine.unregisterTween(this)
        this.evaluate(1)
        this.tweenEnded.invoke()
    }


    public chain(tween: TweenBase): TweenBase
    {
        TweenEngine.unregisterTween(tween)
        this.tweenEnded.subscribe(tween.start)
        tween.tweenStarted.subscribe(() => TweenEngine.registerTween(tween))
        return tween
    }
}

export default TweenBase