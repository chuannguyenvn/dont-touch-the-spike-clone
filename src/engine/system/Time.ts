class Time
{
    public static _lastFrameTime: number
    private static _startTime: number

    public static _init() {
        Time._startTime = Date.now()
    }

    public static time() {
        return Date.now() / 1000
    }

    public static timeSinceGameStart() {
        return (Date.now() - Time._startTime) / 1000
    }

    public static deltaTime() {
        return (Date.now() - Time._lastFrameTime) / 1000
    }
}

export default Time