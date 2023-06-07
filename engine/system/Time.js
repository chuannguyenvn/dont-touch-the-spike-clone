class Time {
    static _init() {
        Time._startTime = Date.now();
    }
    static time() {
        return Date.now() / 1000;
    }
    static timeSinceGameStart() {
        return (Date.now() - Time._startTime) / 1000;
    }
    static deltaTime() {
        return (Date.now() - Time._lastFrameTime) / 1000;
    }
}
export default Time;
//# sourceMappingURL=Time.js.map