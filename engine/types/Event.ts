class GameEvent
{
    private _eventCallbacks: (() => void)[] = []

    public subscribe(callback: () => void): void
    {
        this._eventCallbacks.push(callback)
    }

    public unsubscribe(): void
    {
        // TODO
    }

    public invoke(): void
    {
        for (let callback of this._eventCallbacks)
        {
            callback()
        }
    }
}

class ParamGameEvent<T>
{
    private _eventCallbacks: ((arg: T) => void)[] = []
    
    public subscribe(callback: (arg: T) => void): void
    {
        this._eventCallbacks.push(callback)
    }

    public unsubscribe(): void
    {
        // TODO
    }

    public invoke(arg: T): void
    {
        for (let callback of this._eventCallbacks)
        {
            callback(arg)
        }
    }
}

export {GameEvent, ParamGameEvent}