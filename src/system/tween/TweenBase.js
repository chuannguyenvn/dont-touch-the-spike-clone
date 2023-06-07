import Time from "../Time.js";
import { GameEvent } from "../../types/Event.js";
import TweenEngine from "./TweenEngine.js";
class TweenBase {
    constructor(duration, delay, ease) {
        this.isStarted = false;
        this.tweenStarted = new GameEvent();
        this.tweenEnded = new GameEvent();
        this.duration = duration;
        this.delay = delay;
        this.ease = ease;
        TweenEngine.registerTween(this);
    }
    start() {
        this.isStarted = true;
        this.startTime = Time.timeSinceGameStart();
        this.tweenStarted.invoke();
    }
    end() {
        TweenEngine.unregisterTween(this);
        this.evaluate(1);
        this.tweenEnded.invoke();
    }
    chain(tween) {
        TweenEngine.unregisterTween(tween);
        this.tweenEnded.subscribe(tween.start);
        tween.tweenStarted.subscribe(() => TweenEngine.registerTween(tween));
        return tween;
    }
}
export default TweenBase;
//# sourceMappingURL=TweenBase.js.map