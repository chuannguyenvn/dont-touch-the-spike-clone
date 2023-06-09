﻿import TweenBase from './TweenBase'
import Time from '../../system/Time'
import easeDictionary from './EaseDictionary'

class TweenEngine {
    private static _tweens: TweenBase[] = []

    public static _registerTween(tween: TweenBase): void {
        this._tweens.push(tween)
    }

    public static _unregisterTween(tween: TweenBase): void {
        TweenEngine._tweens = TweenEngine._tweens.filter((x) => x != tween)
    }

    public static _handleTween(): void {
        const finishedTweens: TweenBase[] = []

        for (const tween of TweenEngine._tweens) {
            if (tween._delay > 0) {
                tween._delay -= Time.deltaTime()
                continue
            }

            if (!tween._isStarted) tween._start()

            const x = (Time.timeSinceGameStart() - tween._startTime) / tween._duration
            const easedX = easeDictionary[tween._ease](x)
            tween.evaluate(easedX)

            if (tween._startTime + tween._duration < Time.timeSinceGameStart()) {
                finishedTweens.push(tween)
                tween.end()
            }
        }

        TweenEngine._tweens = TweenEngine._tweens.filter((x) => !finishedTweens.includes(x))
    }
}

export default TweenEngine
