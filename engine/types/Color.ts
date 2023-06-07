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
            let hex = Math.round(c * 255).toString(16)
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

    public static red(): Color
    {
        return new Color(1, 0, 0, 1)
    }

    public static green(): Color
    {
        return new Color(0, 1, 0, 1)
    }

    public static blue(): Color
    {
        return new Color(0, 0, 1, 1)
    }

    public static yellow(): Color
    {
        return new Color(1, 1, 0, 1)
    }

    public static cyan(): Color
    {
        return new Color(0, 1, 1, 1)
    }

    public static magenta(): Color
    {
        return new Color(1, 0, 1, 1)
    }

    public static grey(): Color
    {
        return new Color(0.5, 0.5, 0.5, 1)
    }


    public static clear()
    {
        return new Color(1, 1, 1, 0)
    }
}

export default Color