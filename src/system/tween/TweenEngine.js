import Time from "../Time.js";
import easeDictionary from "./EaseDictionary.js";
class TweenEngine {
    static registerTween(tween) {
        this.tweens.push(tween);
    }
    static handleTween() {
        let finishedTweens = [];
        for (let tween of TweenEngine.tweens) {
            if (tween.startTime + tween.delay < Time.timeSinceGameStart()) {
                let x = (Time.timeSinceGameStart() - tween.startTime) / tween.duration;
                let easedX = easeDictionary[tween.ease](x);
                tween.evaluate(easedX);
            }
            if (tween.startTime + tween.duration < Time.timeSinceGameStart()) {
                finishedTweens.push(tween);
            }
        }
        TweenEngine.tweens = TweenEngine.tweens.filter(x => !finishedTweens.includes(x));
    }
}
TweenEngine.tweens = [];
export default TweenEngine;
//# sourceMappingURL=TweenEngine.js.map