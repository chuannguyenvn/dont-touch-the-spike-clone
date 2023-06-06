import TweenEngine from "./TweenEngine.js"
import Ease from "./Ease.js"
import Vector2 from "../../types/Vector2.js"
import TweenBase from "./TweenBase.js"


class Tween<T extends number | Vector2> extends TweenBase
{
    public startValue: T

    constructor(evaluateFunction: (x: number) => void,
                startValue: T,
                duration: number,
                delay: number,
                ease: Ease)
    {
        super(duration, delay, ease)
        this.evaluate = evaluateFunction
        this.startValue = startValue
        TweenEngine.registerTween(this)
    }
}


export default Tween