import Vector from "./Vector.js"

class Matrix
{
    public static zero()
    {
        return new Matrix(
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
        )
    }

    public static identity()
    {
        return new Matrix(
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        )
    }

    public values: number[][] = []

    constructor(x1y1: number = 0, x2y1: number = 0, x3y1: number = 0,
                x1y2: number = 0, x2y2: number = 0, x3y2: number = 0,
                x1y3: number = 0, x2y3: number = 0, x3y3: number = 0)
    {
        this.values = [
            [x1y1, x2y1, x3y1],
            [x1y2, x2y2, x3y2],
            [x1y3, x2y3, x3y3],
        ]

    }

    public multiplyMatrix(other: Matrix)
    {
        let result = new Matrix()

        let a = this.values
        let b = other.values
        let r = result.values

        let a00 = a[0][0], a01 = a[0][1], a02 = a[0][2]
        let a10 = a[1][0], a11 = a[1][1], a12 = a[1][2]
        let a20 = a[2][0], a21 = a[2][1], a22 = a[2][2]

        let b00 = b[0][0], b01 = b[0][1], b02 = b[0][2]
        let b10 = b[1][0], b11 = b[1][1], b12 = b[1][2]
        let b20 = b[2][0], b21 = b[2][1], b22 = b[2][2]

        r[0][0] = a00 * b00 + a01 * b10 + a02 * b20
        r[0][1] = a00 * b01 + a01 * b11 + a02 * b21
        r[0][2] = a00 * b02 + a01 * b12 + a02 * b22

        r[1][0] = a10 * b00 + a11 * b10 + a12 * b20
        r[1][1] = a10 * b01 + a11 * b11 + a12 * b21
        r[1][2] = a10 * b02 + a11 * b12 + a12 * b22

        r[2][0] = a20 * b00 + a21 * b10 + a22 * b20
        r[2][1] = a20 * b01 + a21 * b11 + a22 * b21
        r[2][2] = a20 * b02 + a21 * b12 + a22 * b22

        return result
    }

    public multiplyMatrixComponentWise(other: Matrix)
    {
        let result = new Matrix()

        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                result.values[i][j] = this.values[i][j] * other.values[i][j]
            }
        }

        return result
    }

    public multiplyVector(vector: Vector): Vector
    {
        const result = new Vector(
            this.values[0][0] * vector.x + this.values[0][1] * vector.y + this.values[0][2] * vector.z,
            this.values[1][0] * vector.x + this.values[1][1] * vector.y + this.values[1][2] * vector.z,
            this.values[2][0] * vector.x + this.values[2][1] * vector.y + this.values[2][2] * vector.z
        )

        return result
    }
}

export default Matrix