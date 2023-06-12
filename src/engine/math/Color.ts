import Maths from './Maths'

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
        return new Color(0, 0, 0, 1)
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

    public static get RANDOM_OPAQUE(): Color {
        return new Color(
            Maths.randomRange(0, 1),
            Maths.randomRange(0, 1),
            Maths.randomRange(0, 1),
            1
        )
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

    public static fromHsv(h: number, s: number, l: number, alpha: number = 1): Color {
        let r, g, b: number

        if (s == 0) {
            r = g = b = l 
        } else {
            const hue2rgb = function hue2rgb(p: number, q: number, t: number) {
                if (t < 0) t += 1
                if (t > 1) t -= 1
                if (t < 1 / 6) return p + (q - p) * 6 * t
                if (t < 1 / 2) return q
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
                return p
            }

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s
            const p = 2 * l - q
            r = hue2rgb(p, q, h + 1 / 3)
            g = hue2rgb(p, q, h)
            b = hue2rgb(p, q, h - 1 / 3)

            console.log(p)
            console.log(q)
            console.log(h)
        }


        
        return new Color(r, g, b, alpha)
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
