import Ease from "./Ease"

const pow = Math.pow
const sqrt = Math.sqrt
const sin = Math.sin
const cos = Math.cos
const PI = Math.PI
const c1 = 1.70158
const c2 = c1 * 1.525
const c3 = c1 + 1
const c4 = (2 * PI) / 3
const c5 = (2 * PI) / 4.5


const easeDictionary
    = {
    [Ease.LINEAR]: (x: number) => x,
    [Ease.IN_QUAD]: function (x: number)
    {
        return x * x
    },
    [Ease.OUT_QUAD]: function (x: number)
    {
        return 1 - (1 - x) * (1 - x)
    },
    [Ease.IN_OUT_QUAD]: function (x: number)
    {
        return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2
    },
    [Ease.IN_CUBIC]: function (x: number)
    {
        return x * x * x
    },
    [Ease.OUT_CUBIC]: function (x: number)
    {
        return 1 - pow(1 - x, 3)
    },
    [Ease.IN_OUT_CUBIC]: function (x: number)
    {
        return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2
    },
    [Ease.IN_QUART]: function (x: number)
    {
        return x * x * x * x
    },
    [Ease.OUT_QUART]: function (x: number)
    {
        return 1 - pow(1 - x, 4)
    },
    [Ease.IN_OUT_QUART]: function (x: number)
    {
        return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2
    },
    [Ease.IN_QUINT]: function (x: number)
    {
        return x * x * x * x * x
    },
    [Ease.OUT_QUINT]: function (x: number)
    {
        return 1 - pow(1 - x, 5)
    },
    [Ease.IN_OUT_QUINT]: function (x: number)
    {
        return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2
    },
    [Ease.IN_SINE]: function (x: number)
    {
        return 1 - cos((x * PI) / 2)
    },
    [Ease.OUT_SINE]: function (x: number)
    {
        return sin((x * PI) / 2)
    },
    [Ease.IN_OUT_SINE]: function (x: number)
    {
        return -(cos(PI * x) - 1) / 2
    },
    [Ease.IN_EXPO]: function (x: number)
    {
        return x === 0 ? 0 : pow(2, 10 * x - 10)
    },
    [Ease.OUT_EXPO]: function (x: number)
    {
        return x === 1 ? 1 : 1 - pow(2, -10 * x)
    },
    [Ease.IN_OUT_EXPO]: function (x: number)
    {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : x < 0.5
                    ? pow(2, 20 * x - 10) / 2
                    : (2 - pow(2, -20 * x + 10)) / 2
    },
    [Ease.IN_CIRC]: function (x: number)
    {
        return 1 - sqrt(1 - pow(x, 2))
    },
    [Ease.OUT_CIRC]: function (x: number)
    {
        return sqrt(1 - pow(x - 1, 2))
    },
    [Ease.IN_OUT_CIRC]: function (x: number)
    {
        return x < 0.5
            ? (1 - sqrt(1 - pow(2 * x, 2))) / 2
            : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2
    },
    [Ease.IN_BACK]: function (x: number)
    {
        return c3 * x * x * x - c1 * x * x
    },
    [Ease.OUT_BACK]: function (x: number)
    {
        return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2)
    },
    [Ease.IN_OUT_BACK]: function (x: number)
    {
        return x < 0.5
            ? (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
            : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2
    },
    [Ease.IN_ELASTIC]: function (x: number)
    {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4)
    },
    [Ease.OUT_ELASTIC]: function (x: number)
    {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1
    },
    [Ease.IN_OUT_ELASTIC]: function (x: number)
    {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : x < 0.5
                    ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2
                    : (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1
    },
}

export default easeDictionary