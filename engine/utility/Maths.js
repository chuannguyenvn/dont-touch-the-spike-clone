class Maths {
    static clamp(val, min, max) {
        if (val < min)
            return min;
        if (val > max)
            return max;
        return val;
    }
}
Maths.rad2Deg = 180 / Math.PI;
Maths.deg2Rad = Math.PI / 180;
export default Maths;
//# sourceMappingURL=Maths.js.map