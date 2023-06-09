class Color {
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

    public static fromHex(hex: string): Color {
        if (hex.startsWith('#')) {
            hex = hex.substring(1)
        }

        const hexValue = parseInt(hex, 16)
        const r = (hexValue >> 16) & 255
        const g = (hexValue >> 8) & 255
        const b = hexValue & 255

        const normalizedR = r / 255
        const normalizedG = g / 255
        const normalizedB = b / 255

        return new Color(normalizedR, normalizedG, normalizedB)
    }

    public toString() {
        function componentToHex(c: number) {
            const hex = Math.round(c * 255)
            return hex
        }

        return `rgba(${componentToHex(this.r)}, ${componentToHex(this.g)}, ${componentToHex(
            this.b
        )}, ${this.a})`
    }

    public add(other: Color): Color {
        const r = this.r + other.r
        const g = this.g + other.g
        const b = this.b + other.b
        const a = this.a + other.a

        const clampedR = Math.max(0, Math.min(1, r))
        const clampedG = Math.max(0, Math.min(1, g))
        const clampedB = Math.max(0, Math.min(1, b))
        const clampedA = Math.max(0, Math.min(1, a))

        return new Color(clampedR, clampedG, clampedB, clampedA)
    }
}

export default Color
