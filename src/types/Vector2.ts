﻿import Maths from "../utility/Maths.js"

class Vector2
{
    // STATIC FUNCTIONS //
    public static left(): Vector2
    {
        return new Vector2(-1, 0)
    }

    public static right(): Vector2
    {
        return new Vector2(1, 0)
    }

    public static up(): Vector2
    {
        return new Vector2(0, 1)
    }

    public static down(): Vector2
    {
        return new Vector2(0, -1)
    }

    public static zero(): Vector2
    {
        return new Vector2(0, 0)
    }

    public static one(): Vector2
    {
        return new Vector2(1, 1)
    }

    // MEMBER METHODS //
    public x: number
    public y: number

    constructor(x: number, y: number)
    {
        this.x = x
        this.y = y
    }

    public length(): number
    {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    public normalized(): Vector2
    {
        let l = this.length()
        return new Vector2(this.x / l, this.y / l)
    }

    public dot(other: Vector2): number
    {
        return this.x * other.x + this.y * other.y
    }

    // Return the degree angle between this vector to toVector.
    public angle(toVector: Vector2): number
    {
        return Math.acos(this.dot(toVector) / (this.length() * toVector.length())) * Maths.Rad2Deg
    }

    public xx(): Vector2
    {
        return new Vector2(this.x, this.x)
    }

    public yy(): Vector2
    {
        return new Vector2(this.y, this.y)
    }

    public xy(): Vector2
    {
        return new Vector2(this.x, this.y)
    }

    public yx(): Vector2
    {
        return new Vector2(this.y, this.x)
    }
}

export default Vector2
