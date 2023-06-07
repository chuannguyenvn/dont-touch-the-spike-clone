import Time from "../Time.js";
import { GameEvent } from "../../types/Event.js";
import TweenEngine from "./TweenEngine.js";
class TweenBase {
    constructor(duration, delay, ease) {
        this._isStarted = false;
        this.tweenStarted = new GameEvent();
        this.tweenEnded = new GameEvent();
        this._duration = duration;
        this._delay = delay;
        this._ease = ease;
        TweenEngine._registerTween(this);
    }
    _start() {
        this._isStarted = true;
        this._startTime = Time.timeSinceGameStart();
        this.tweenStarted.invoke();
    }
    _end() {
        TweenEngine._unregisterTween(this);
        this.evaluate(1);
        this.tweenEnded.invoke();
    }
    chain(tween) {
        TweenEngine._unregisterTween(tween);
        this.tweenEnded.subscribe(tween._start);
        tween.tweenStarted.subscribe(() => TweenEngine._registerTween(tween));
        return tween;
    }
}
export default TweenBase;
//# sourceMappingURL=TweenBase.js.map