class Color
{
    // MEMBER VARIABLES //
    public r: number
    public g: number
    public b: number
    public a: number

    constructor(r = 1, g = 1, b = 1, a = 1) {
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }

    // CONSTANTS //
    public static get BLACK(): Color {
        return new Color(0, 0, 0, 0)
    }

    public static get WHITE(): Color {
        return new Color(1, 1, 1, 1)
    }

    public static get RED(): Color {
        return new Color(1, 0, 0, 1)
    }

    public static get GREEN(): Color {
        return new Color(0, 1, 0, 1)
    }

    public static get BLUE(): Color {
        return new Color(0, 0, 1, 1)
    }

    public static get YELLOW(): Color {
        return new Color(1, 1, 0, 1)
    }

    public static get CYAN(): Color {
        return new Color(0, 1, 1, 1)
    }

    public static get MAGENTA(): Color {
        return new Color(1, 0, 1, 1)
    }

    public static get GREY(): Color {
        return new Color(0.5, 0.5, 0.5, 1)
    }

    public static get CLEAR(): Color {
        return new Color(1, 1, 1, 0)
    }

    public toString() {
        function componentToHex(c: number) {
            const hex = Math.round(c * 255)
            return hex
        }

        return `rgba(${componentToHex(this.r)}, ${componentToHex(this.g)}, ${componentToHex(this.b)}, ${this.a})`
    }
}

export default Color
