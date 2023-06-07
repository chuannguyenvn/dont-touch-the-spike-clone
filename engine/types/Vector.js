class Vector {
    // STATIC FUNCTIONS //
    static left() {
        return new Vector(-1, 0, 0);
    }
    static right() {
        return new Vector(1, 0, 0);
    }
    static up() {
        return new Vector(0, 1, 0);
    }
    static down() {
        return new Vector(0, -1, 0);
    }
    static zero() {
        return new Vector(0, 0, 0);
    }
    static one() {
        return new Vector(1, 1, 1);
    }
    static distance(v1, v2) {
        return v1.subtract(v2).length();
    }
    constructor(x, y, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalized() {
        let l = this.length();
        if (l !== 0) {
            return new Vector(this.x / l, this.y / l, 0);
        }
        return new Vector(0, 0, 0);
    }
    dot(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }
    cross(other) {
        const resultX = this.y * other.z - this.z * other.y;
        const resultY = this.z * other.x - this.x * other.z;
        const resultZ = this.x * other.y - this.y * other.x;
        return new Vector(resultX, resultY, resultZ);
    }
    // Return the angle in degrees between this vector and toVector.
    angle(toVector) {
        const dotProduct = this.dot(toVector);
        const lengthProduct = this.length() * toVector.length();
        return Math.acos(dotProduct / lengthProduct) * (180 / Math.PI);
    }
    add(other) {
        return new Vector(this.x + other.x, this.y + other.y, this.z + other.z);
    }
    subtract(other) {
        return new Vector(this.x - other.x, this.y - other.y, this.z - other.z);
    }
    multiply(number) {
        return new Vector(this.x * number, this.y * number, this.z * number);
    }
    xx() {
        return new Vector(this.x, this.x, this.z);
    }
    yy() {
        return new Vector(this.y, this.y, this.z);
    }
    xy() {
        return new Vector(this.x, this.y, this.z);
    }
    yx() {
        return new Vector(this.y, this.x, this.z);
    }
}
export default Vector;
//# sourceMappingURL=Vector.js.map