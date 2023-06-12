import Maths from './Maths'

class Vector {
    // MEMBER VARIABLES //
    public x: number
    public y: number
    public z: number

    constructor(x: number, y: number, z: number = 1) {
        this.x = x
        this.y = y
        this.z = z
    }

    // CONSTANTS //
    public static get LEFT(): Vector {
        return new Vector(-1, 0, 0)
    }

    public static get RIGHT(): Vector {
        return new Vector(1, 0, 0)
    }

    public static get UP(): Vector {
        return new Vector(0, 1, 0)
    }

    public static get DOWN(): Vector {
        return new Vector(0, -1, 0)
    }

    public static get ZERO(): Vector {
        return new Vector(0, 0, 0)
    }

    public static get ONE(): Vector {
        return new Vector(1, 1, 1)
    }

    public static get RANDOM_UNIT(): Vector {
        return new Vector(Maths.randomRange(-1, 1), Maths.randomRange(-1, 1)).normalized()
    }

    // OTHER METHODS //
    public static distance(v1: Vector, v2: Vector): number {
        return v1.subtract(v2).length()
    }

    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    public normalized(): Vector {
        const l = this.length()
        if (l !== 0) {
            return new Vector(this.x / l, this.y / l, 0)
        }
        return new Vector(0, 0, 0)
    }

    public dot(other: Vector): number {
        return this.x * other.x + this.y * other.y + this.z * other.z
    }

    public cross(other: Vector): Vector {
        const resultX = this.y * other.z - this.z * other.y
        const resultY = this.z * other.x - this.x * other.z
        const resultZ = this.x * other.y - this.y * other.x
        return new Vector(resultX, resultY, resultZ)
    }

    public angle(toVector: Vector): number {
        const dotProduct = this.dot(toVector)
        const lengthProduct = this.length() * toVector.length()
        return Math.acos(dotProduct / lengthProduct) * (180 / Math.PI)
    }

    public copy(): Vector {
        return new Vector(this.x, this.y, this.z)
    }

    public toString(): string {
        return `Vector(${this.x}, ${this.y}, ${this.z})`
    }

    public add(other: Vector): Vector {
        return new Vector(this.x + other.x, this.y + other.y, this.z + other.z)
    }

    public subtract(other: Vector): Vector {
        return new Vector(this.x - other.x, this.y - other.y, this.z - other.z)
    }

    public multiply(number: number): Vector {
        return new Vector(this.x * number, this.y * number, this.z * number)
    }

    public multiplyComp(other: Vector): Vector {
        return new Vector(this.x * other.x, this.y * other.y, this.z * other.z)
    }

    public xx(): Vector {
        return new Vector(this.x, this.x, this.z)
    }

    public yy(): Vector {
        return new Vector(this.y, this.y, this.z)
    }

    public xy(): Vector {
        return new Vector(this.x, this.y, this.z)
    }

    public yx(): Vector {
        return new Vector(this.y, this.x, this.z)
    }
}

export default Vector
