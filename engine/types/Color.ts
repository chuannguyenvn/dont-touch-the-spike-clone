class Color
{
    public r: number
    public g: number
    public b: number
    public a: number

    constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 0)
    {
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }

    public static black()
    {
        return new Color(0, 0, 0, 0)
    }

    public static white()
    {
        return new Color(1, 1, 1, 1)
    }

    public static clear()
    {
        return new Color(1, 1, 1, 0)
    }
}

export default Color