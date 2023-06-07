import TweenBase from "./TweenBase.js";
class Tween extends TweenBase {
    constructor(evaluateFunction, retrieveStartValue, duration, delay, ease) {
        super(duration, delay, ease);
        this.evaluate = evaluateFunction;
        this.retrieveStartValue = retrieveStartValue;
        this.start = this.start.bind(this);
    }
    start() {
        console.log(this);
        this.startValue = this.retrieveStartValue();
        super.start();
    }
}
export default Tween;
//# sourceMappingURL=Tween.js.map