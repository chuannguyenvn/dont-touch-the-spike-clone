import Debug from './Debug'
import Timer from '../utility/Timer'

class Time {
    public static _lastFrameTime: number
    private static _startTime: number
    private static _timeSinceGameStart: number = 0

    public static isPaused: boolean = false
    private static _timers: Map<number, Timer> = new Map<number, Timer>()

    public static _init() {
        Time._startTime = performance.now()

        Debug.log('Time initialized.')
    }

    public static time(): number {
        return Date.now() / 1000
    }

    public static timeSinceGameStart(): number {
        if (Time.isPaused) return 0
        return Time._timeSinceGameStart
    }

    public static deltaTime(): number {
        if (Time.isPaused) return 0
        return (performance.now() - Time._lastFrameTime) / 1000
    }

    public static _handleTimer(): void {
        if (Time.isPaused) return
        const deltaTime = Time.deltaTime()
        Time._timers.forEach((timer, _) => timer.evaluate(deltaTime))
        Time._timeSinceGameStart += Time.deltaTime()
    }

    public static _registerTimer(timer: Timer): void {
        Time._timers.set(timer.guid, timer)
    }

    public static _unregisterTimer(timer: Timer): void {
        Time._timers.delete(timer.guid)
    }
}

export default Time
