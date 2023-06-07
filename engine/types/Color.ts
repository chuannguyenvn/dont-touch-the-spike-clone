class Color
{
    public r: number
    public g: number
    public b: number
    public a: number

    constructor(r: number = 1, g: number = 1, b: number = 1, a: number = 1)
    {
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }

    public toHex()
    {
        function componentToHex(c: number)
        {
            let hex = c.toString(16)
            return hex.length == 1 ? "0" + hex : hex
        }

        return "#" + componentToHex(this.r) + componentToHex(this.g) + componentToHex(this.b)

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