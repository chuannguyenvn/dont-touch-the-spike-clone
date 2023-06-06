class GameEvent
{
    private eventCallbacks: (() => void)[] = []

    public subscribe(callback: () => void): void
    {
        this.eventCallbacks.push(callback)
    }

    public unsubscribe(): void
    {
        // TODO
    }

    public invoke(): void
    {
        for (let callback of this.eventCallbacks)
        {
            callback()
        }
    }
}

class ParamGameEvent<T>
{
    private eventCallbacks: ((arg: T) => void)[] = []
    
    public subscribe(callback: (arg: T) => void): void
    {
        this.eventCallbacks.push(callback)
    }

    public unsubscribe(): void
    {
        // TODO
    }

    public invoke(arg: T): void
    {
        for (let callback of this.eventCallbacks)
        {
            callback(arg)
        }
    }
}

export {GameEvent, ParamGameEvent}