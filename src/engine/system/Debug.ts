class Debug {
    public static _isDebugging: boolean

    public static _init(isDebugging: boolean) {
        Debug._isDebugging = isDebugging

        Debug.log('Debug initialized.')
    }

    public static assert(condition: boolean, message: string): void {
        if (Debug._isDebugging) console.assert(condition, message)
    }

    public static log(message: string): void {
        if (Debug._isDebugging) console.log(message)
    }

    public static logError(message: string): void {
        if (Debug._isDebugging) console.error(message)
    }
}

export default Debug
