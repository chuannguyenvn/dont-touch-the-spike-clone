import Maths from "../utility/Maths.js";
class Vector2 {
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
Vector2.left = () => new Vector2(-1, 0);
Vector2.right = () => new Vector2(1, 0);
Vector2.up = () => new Vector2(0, 1);
Vector2.down = () => new Vector2(0, -1);
Vector2.zero = () => new Vector2(0, 0);
Vector2.one = () => new Vector2(1, 1);
export default Vector2;
//# sourceMappingURL=Vector2.js.map