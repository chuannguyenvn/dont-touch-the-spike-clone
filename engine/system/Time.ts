class Time
{
    private static startTime: number
    public static lastFrameTime: number
    
    public static init()
    {
         Time.startTime = Date.now()       
    }
    
    public static time()
    {
        return Date.now() / 1000
    }
    
    public static timeSinceGameStart()
    {
        return (Date.now() - Time.startTime) / 1000
    }
    
    public static deltaTime()
    {
        return (Date.now() - Time.lastFrameTime) / 1000
    }
}

export default Time