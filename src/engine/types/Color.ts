class Color
{
    public r: number
    public g: number
    public b: number
    public a: number

    constructor(r = 1, g = 1, b = 1, a = 1)
    {
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }

    public toString()
    {
        function componentToHex(c: number)
        {
            const hex = Math.round(c * 255)
            return hex
        }

        console.log(`rgba(${componentToHex(this.r)}, ${componentToHex(this.g)}, ${componentToHex(this.b)}, ${this.a})`)
        return `rgba(${componentToHex(this.r)}, ${componentToHex(this.g)}, ${componentToHex(this.b)}, ${this.a})`
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