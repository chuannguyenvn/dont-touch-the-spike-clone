import TweenBase from "./TweenBase.js"
import Time from "../Time.js"
import easeDictionary from "./EaseDictionary.js"

class TweenEngine
{
    private static tweens: TweenBase[] = []

    public static registerTween(tween: TweenBase): void
    {
        this.tweens.push(tween)
    }

    public static handleTween(): void
    {
        let finishedTweens: TweenBase[] = []

        for (let tween of TweenEngine.tweens)
        {
            if (tween.startTime + tween.delay < Time.timeSinceGameStart())
            {
                let x = (Time.timeSinceGameStart() - tween.startTime) / tween.duration
                let easedX = easeDictionary[tween.ease](x)
                tween.evaluate(easedX)
            }
            if (tween.startTime + tween.duration < Time.timeSinceGameStart())
            {
                finishedTweens.push(tween)
            }
        }
        
        TweenEngine.tweens = TweenEngine.tweens.filter(x => !finishedTweens.includes(x))
    }
}

export default TweenEngine