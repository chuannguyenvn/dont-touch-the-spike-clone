class Color {
    constructor(r = 0, g = 0, b = 0, a = 0) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    static black() {
        return new Color(0, 0, 0, 0);
    }
    static white() {
        return new Color(1, 1, 1, 1);
    }
    static clear() {
        return new Color(1, 1, 1, 0);
    }
}
export default Color;
//# sourceMappingURL=Color.js.map