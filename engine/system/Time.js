class Time {
    static init() {
        Time.startTime = Date.now();
    }
    static time() {
        return Date.now() / 1000;
    }
    static timeSinceGameStart() {
        return (Date.now() - Time.startTime) / 1000;
    }
    static deltaTime() {
        return (Date.now() - Time.lastFrameTime) / 1000;
    }
}
export default Time;
//# sourceMappingURL=Time.js.map