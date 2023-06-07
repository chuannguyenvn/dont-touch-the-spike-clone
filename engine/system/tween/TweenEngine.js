import Time from "../Time.js";
import easeDictionary from "./EaseDictionary.js";
class TweenEngine {
    static _registerTween(tween) {
        this._tweens.push(tween);
    }
    static _unregisterTween(tween) {
        TweenEngine._tweens = TweenEngine._tweens.filter(x => x != tween);
    }
    static _handleTween() {
        let finishedTweens = [];
        for (let tween of TweenEngine._tweens) {
            if (!tween._isStarted)
                tween._start();
            if (tween._startTime + tween._delay < Time.timeSinceGameStart()) {
                let x = (Time.timeSinceGameStart() - tween._startTime) / tween._duration;
                let easedX = easeDictionary[tween._ease](x);
                tween.evaluate(easedX);
            }
            if (tween._startTime + tween._duration < Time.timeSinceGameStart()) {
                finishedTweens.push(tween);
                tween._end();
            }
        }
        TweenEngine._tweens = TweenEngine._tweens.filter(x => !finishedTweens.includes(x));
    }
}
TweenEngine._tweens = [];
export default TweenEngine;
//# sourceMappingURL=TweenEngine.js.map