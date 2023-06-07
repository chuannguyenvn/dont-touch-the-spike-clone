class Color {
    constructor(r = 1, g = 1, b = 1, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    toHex() {
        function componentToHex(c) {
            let hex = (c* 255).toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
        return "#" + componentToHex(this.r) + componentToHex(this.g) + componentToHex(this.b);
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