class Debug
{
    public static assert(condition: boolean, message: string): void
    {
        console.assert(condition, message)
    }

    public static log(message: string): void
    {
        // Can save the logged message into a txt
        console.log(message)
    }

    public static logError(message: string): void
    {
        console.error(message)
    }
}

export default Debug