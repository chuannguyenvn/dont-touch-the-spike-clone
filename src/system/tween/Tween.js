import TweenEngine from "./TweenEngine.js";
import TweenBase from "./TweenBase.js";
class Tween extends TweenBase {
    constructor(evaluateFunction, startValue, duration, delay, ease) {
        super(duration, delay, ease);
        this.evaluate = evaluateFunction;
        this.startValue = startValue;
        TweenEngine.registerTween(this);
    }
}
export default Tween;
//# sourceMappingURL=Tween.js.map