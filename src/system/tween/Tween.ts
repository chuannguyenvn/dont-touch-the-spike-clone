import TweenEngine from "./TweenEngine.js"
import Ease from "./Ease.js"
import Vector2 from "../../types/Vector2.js"
import TweenBase from "./TweenBase.js"


class Tween<T extends number | Vector2> extends TweenBase
{
    public retrieveStartValue: () => T
    public startValue: T

    constructor(evaluateFunction: (x: number) => void,
                retrieveStartValue: () => T,
                duration: number,
                delay: number,
                ease: Ease)
    {
        super(duration, delay, ease)
        this.evaluate = evaluateFunction
        this.retrieveStartValue = retrieveStartValue
        this.start = this.start.bind(this)
    }

    public start()
    {
        console.log(this)
        this.startValue = this.retrieveStartValue()
        super.start()
    }
}


export default Tween