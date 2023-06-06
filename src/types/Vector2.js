import Maths from "../utility/Maths.js";
class Vector2 {
    // STATIC FUNCTIONS //
    static left() {
        return new Vector2(-1, 0);
    }
    static right() {
        return new Vector2(1, 0);
    }
    static up() {
        return new Vector2(0, 1);
    }
    static down() {
        return new Vector2(0, -1);
    }
    static zero() {
        return new Vector2(0, 0);
    }
    static one() {
        return new Vector2(1, 1);
    }
    static distance(v1, v2) {
        return v1.subtract(v2).length();
    }
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalized() {
        let l = this.length();
        return new Vector2(this.x / l, this.y / l);
    }
    dot(other) {
        return this.x * other.x + this.y * other.y;
    }
    // Return the degree angle between this vector to toVector.
    angle(toVector) {
        return Math.acos(this.dot(toVector) / (this.length() * toVector.length())) * Maths.Rad2Deg;
    }
    add(other) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }
    subtract(other) {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
    multiply(number) {
        return new Vector2(this.x * number, this.y * number);
    }
    xx() {
        return new Vector2(this.x, this.x);
    }
    yy() {
        return new Vector2(this.y, this.y);
    }
    xy() {
        return new Vector2(this.x, this.y);
    }
    yx() {
        return new Vector2(this.y, this.x);
    }
}
export default Vector2;
//# sourceMappingURL=Vector2.js.map