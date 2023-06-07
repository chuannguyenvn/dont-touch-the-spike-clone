class Color {
    constructor(r = 1, g = 1, b = 1, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    toHex() {
        function componentToHex(c) {
            let hex = Math.round(c * 255).toString(16);
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
    static red() {
        return new Color(1, 0, 0, 1);
    }
    static green() {
        return new Color(0, 1, 0, 1);
    }
    static blue() {
        return new Color(0, 0, 1, 1);
    }
    static yellow() {
        return new Color(1, 1, 0, 1);
    }
    static cyan() {
        return new Color(0, 1, 1, 1);
    }
    static magenta() {
        return new Color(1, 0, 1, 1);
    }
    static grey() {
        return new Color(0.5, 0.5, 0.5, 1);
    }
    static clear() {
        return new Color(1, 1, 1, 0);
    }
}
export default Color;
//# sourceMappingURL=Color.js.map