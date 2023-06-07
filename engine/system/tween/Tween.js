import TweenBase from "./TweenBase.js";
class Tween extends TweenBase {
    constructor(evaluateFunction, retrieveStartValue, duration, delay, ease) {
        super(duration, delay, ease);
        this.evaluate = evaluateFunction;
        this._retrieveStartValue = retrieveStartValue;
        this._start = this._start.bind(this);
    }
    _start() {
        this._startValue = this._retrieveStartValue();
        super._start();
    }
}
export default Tween;
//# sourceMappingURL=Tween.js.map