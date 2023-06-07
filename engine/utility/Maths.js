class Maths {
    static clamp(val, min, max) {
        if (val < min)
            return min;
        if (val > max)
            return max;
        return val;
    }
    static sign(val) {
        if (val > 0)
            return 1;
        if (val < 0)
            return -1;
        return 0;
    }
    static randomRangeInt(minInclusive, maxExclusive) {
        return Math.round(Math.random() * (maxExclusive - minInclusive)) + minInclusive;
    }
}
Maths.rad2Deg = 180 / Math.PI;
Maths.deg2Rad = Math.PI / 180;
export default Maths;
//# sourceMappingURL=Maths.js.map