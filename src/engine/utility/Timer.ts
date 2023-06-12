import Time from '../system/Time'
import GUID from '../system/GUID'

class Timer {
    public readonly guid: number

    private callback: () => void
    public readonly delay: number
    private delayCountdown: number
    public readonly repeat: number
    private repeatCountdown: number
    public readonly interval: number
    private intervalCountdown: number

    constructor(callback: () => void, delay: number, repeat: number = 1, interval: number = 1) {
        this.callback = callback
        this.delay = delay
        this.repeat = repeat
        this.interval = interval

        this.delayCountdown = delay
        this.repeatCountdown = repeat
        this.intervalCountdown = -1

        this.guid = GUID.getId()

        Time._registerTimer(this)
    }

    public evaluate(deltaTime: number) {
        if (this.repeatCountdown === 0) {
            Time._unregisterTimer(this)
            return
        }

        if (this.delayCountdown > 0) {
            this.delayCountdown -= deltaTime
            return
        }

        if (this.intervalCountdown > 0) {
            this.intervalCountdown -= deltaTime
            return
        }

        this.callback()
        this.intervalCountdown = this.interval
        this.repeatCountdown--
    }
}

export default Timer
