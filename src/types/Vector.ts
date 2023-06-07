class Vector
{
    // STATIC FUNCTIONS //
    public static left(): Vector
    {
        return new Vector(-1, 0, 0)
    }

    public static right(): Vector
    {
        return new Vector(1, 0, 0)
    }

    public static up(): Vector
    {
        return new Vector(0, 1, 0)
    }

    public static down(): Vector
    {
        return new Vector(0, -1, 0)
    }

    public static zero(): Vector
    {
        return new Vector(0, 0, 0)
    }

    public static one(): Vector
    {
        return new Vector(1, 1, 1)
    }

    public static distance(v1: Vector, v2: Vector): number
    {
        return v1.subtract(v2).length()
    }

    // MEMBER METHODS //
    public x: number
    public y: number
    public z: number

    constructor(x: number, y: number, z: number)
    {
        this.x = x
        this.y = y
        this.z = z
    }

    public length(): number
    {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    public normalized(): Vector
    {
        let l = this.length()
        if (l !== 0)
        {
            return new Vector(this.x / l, this.y / l, 0)
        }
        return new Vector(0, 0, 0)
    }

    public dot(other: Vector): number
    {
        return this.x * other.x + this.y * other.y + this.z * other.z
    }

    public cross(other: Vector): Vector
    {
        const resultX = this.y * other.z - this.z * other.y
        const resultY = this.z * other.x - this.x * other.z
        const resultZ = this.x * other.y - this.y * other.x
        return new Vector(resultX, resultY, resultZ)
    }

    // Return the angle in degrees between this vector and toVector.
    public angle(toVector: Vector): number
    {
        const dotProduct = this.dot(toVector)
        const lengthProduct = this.length() * toVector.length()
        return Math.acos(dotProduct / lengthProduct) * (180 / Math.PI)
    }

    public add(other: Vector): Vector
    {
        return new Vector(this.x + other.x, this.y + other.y, this.z + other.z)
    }

    public subtract(other: Vector): Vector
    {
        return new Vector(this.x - other.x, this.y - other.y, this.z - other.z)
    }

    public multiply(number: number): Vector
    {
        return new Vector(this.x * number, this.y * number, this.z * number)
    }

    public xx(): Vector
    {
        return new Vector(this.x, this.x, this.z)
    }

    public yy(): Vector
    {
        return new Vector(this.y, this.y, this.z)
    }

    public xy(): Vector
    {
        return new Vector(this.x, this.y, this.z)
    }

    public yx(): Vector
    {
        return new Vector(this.y, this.x, this.z)
    }
}

export default Vector
