import Vector from "./Vector.js"
import Maths from "../utility/Maths.js"

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

    public static translate(x: number, y: number): Matrix
    {
        const translationMatrix = Matrix.identity()
        translationMatrix.values[0][2] = x
        translationMatrix.values[1][2] = y
        return translationMatrix
    }

    public static rotate(angle: number): Matrix
    {
        const rotationMatrix = Matrix.identity()
        const cosTheta = Math.cos(angle * Maths.Deg2Rad)
        const sinTheta = Math.sin(angle * Maths.Deg2Rad)
        rotationMatrix.values[0][0] = cosTheta
        rotationMatrix.values[0][1] = -sinTheta
        rotationMatrix.values[1][0] = sinTheta
        rotationMatrix.values[1][1] = cosTheta
        return rotationMatrix
    }

    public static scale(x: number, y: number): Matrix
    {
        const scaleMatrix = Matrix.identity()
        scaleMatrix.values[0][0] = x
        scaleMatrix.values[1][1] = y
        return scaleMatrix
    }

    public values: number[][] = []

    constructor(x0y0: number = 0, x0y1: number = 0, x0y2: number = 0,
                x1y0: number = 0, x1y1: number = 0, x1y2: number = 0,
                x2y0: number = 0, x2y1: number = 0, x2y2: number = 0)
    {
        this.values = [
            [x0y0, x0y1, x0y2],
            [x1y0, x1y1, x1y2],
            [x2y0, x2y1, x2y2],
        ]
    }

    public determinant(): number
    {
        const a = this.values[0][0]
        const b = this.values[0][1]
        const c = this.values[0][2]
        const d = this.values[1][0]
        const e = this.values[1][1]
        const f = this.values[1][2]
        const g = this.values[2][0]
        const h = this.values[2][1]
        const i = this.values[2][2]

        const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g)

        return det
    }

    public inverse(): Matrix
    {
        const determinant = this.determinant()
        if (determinant === 0)
        {
            throw new Error("Matrix is not invertible.")
        }

        const inverseMatrix = new Matrix()
        const invDeterminant = 1 / determinant

        inverseMatrix.values[0][0] = (this.values[1][1] * this.values[2][2] - this.values[1][2] * this.values[2][1]) * invDeterminant
        inverseMatrix.values[0][1] = (this.values[0][2] * this.values[2][1] - this.values[0][1] * this.values[2][2]) * invDeterminant
        inverseMatrix.values[0][2] = (this.values[0][1] * this.values[1][2] - this.values[0][2] * this.values[1][1]) * invDeterminant

        inverseMatrix.values[1][0] = (this.values[1][2] * this.values[2][0] - this.values[1][0] * this.values[2][2]) * invDeterminant
        inverseMatrix.values[1][1] = (this.values[0][0] * this.values[2][2] - this.values[0][2] * this.values[2][0]) * invDeterminant
        inverseMatrix.values[1][2] = (this.values[0][2] * this.values[1][0] - this.values[0][0] * this.values[1][2]) * invDeterminant

        inverseMatrix.values[2][0] = (this.values[1][0] * this.values[2][1] - this.values[1][1] * this.values[2][0]) * invDeterminant
        inverseMatrix.values[2][1] = (this.values[0][1] * this.values[2][0] - this.values[0][0] * this.values[2][1]) * invDeterminant
        inverseMatrix.values[2][2] = (this.values[0][0] * this.values[1][1] - this.values[0][1] * this.values[1][0]) * invDeterminant

        return inverseMatrix
    }

    public transpose(): Matrix
    {
        const transposeMatrix = new Matrix()

        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                transposeMatrix.values[i][j] = this.values[j][i]
            }
        }

        return transposeMatrix
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

    public matrixMultiplyComponentWise(other: Matrix)
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
        return new Vector(
            this.values[0][0] * vector.x + this.values[0][1] * vector.y + this.values[0][2] * vector.z,
            this.values[1][0] * vector.x + this.values[1][1] * vector.y + this.values[1][2] * vector.z,
            this.values[2][0] * vector.x + this.values[2][1] * vector.y + this.values[2][2] * vector.z
        )
    }
}

export default Matrix