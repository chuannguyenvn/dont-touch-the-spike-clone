import Time from "../Time.js";
class TweenBase {
    constructor(duration, delay, ease) {
        this.startTime = Time.timeSinceGameStart();
        this.duration = duration;
        this.delay = delay;
        this.ease = ease;
    }
}
export default TweenBase;
//# sourceMappingURL=TweenBase.js.map