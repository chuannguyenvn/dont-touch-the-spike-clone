import Debug from './Debug'
import Timer from '../utility/Timer'

class Time {
    public static _lastFrameTime: number
    private static _startTime: number

    private static _timers: Map<number, Timer> = new Map<number, Timer>()

    public static _init() {
        Time._startTime = Date.now()

        Debug.log('Time initialized.')
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

    public static _handleTimer() {
        const deltaTime = Time.deltaTime()
        Time._timers.forEach((timer, _) => timer.evaluate(deltaTime))
    }

    public static _registerTimer(timer: Timer) {
        Time._timers.set(timer.guid, timer)
    }

    public static _unregisterTimer(timer: Timer) {
        Time._timers.delete(timer.guid)
    }
}

export default Time
