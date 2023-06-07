import TweenBase from "./TweenBase.js"
import Time from "../Time.js"
import easeDictionary from "./EaseDictionary.js"

class TweenEngine
{
    private static _tweens: TweenBase[] = []

    public static _registerTween(tween: TweenBase): void
    {
        this._tweens.push(tween)
    }

    public static _unregisterTween(tween: TweenBase): void
    {
        TweenEngine._tweens = TweenEngine._tweens.filter(x => x != tween)
    }

    public static _handleTween(): void
    {
        let finishedTweens: TweenBase[] = []

        for (let tween of TweenEngine._tweens)
        {
            if (!tween._isStarted) tween._start()
            
            if (tween._startTime + tween._delay < Time.timeSinceGameStart())
            {
                let x = (Time.timeSinceGameStart() - tween._startTime) / tween._duration
                let easedX = easeDictionary[tween._ease](x)
                tween.evaluate(easedX)
            }
            
            if (tween._startTime + tween._duration < Time.timeSinceGameStart())
            {
                finishedTweens.push(tween)
                tween._end()
            }
        }

        TweenEngine._tweens = TweenEngine._tweens.filter(x => !finishedTweens.includes(x))
    }
}

export default TweenEngine