import Ease from "./Ease.js"
import Time from "../Time.js"

class TweenBase
{
    public evaluate: (x: number) => void
    public readonly startTime: number
    public readonly duration: number
    public readonly delay: number
    public readonly ease: Ease

    constructor(duration: number, delay: number, ease: Ease)
    {
        this.startTime = Time.timeSinceGameStart()
        this.duration = duration
        this.delay = delay
        this.ease = ease
    }
}

export default TweenBase