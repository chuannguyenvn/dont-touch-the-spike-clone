class Maths
{
    public static rad2Deg: number = 180 / Math.PI
    public static deg2Rad: number = Math.PI / 180

    public static clamp(val: number, min: number, max: number): number {
        if (val < min) return min
        if (val > max) return max
        return val
    }

    public static sign(val: number): number {
        if (val > 0) return 1
        if (val < 0) return -1
        return 0
    }

    public static randomRange(minInclusive: number, maxInclusive: number): number {
        return Math.random() * (maxInclusive - minInclusive) + minInclusive
    }

    public static randomRangeInt(minInclusive: number, maxExclusive: number): number {
        return Math.round(Maths.randomRange(minInclusive, maxExclusive)) + minInclusive
    }

    public static randomIntBag(minInclusive: number, maxExclusive: number, drawCount: number) {
        const range = Array.from({length: maxExclusive - minInclusive},
            (_, index) => index + minInclusive)
        const shuffledRange: number[] = []

        while (shuffledRange.length < drawCount && range.length > 0)
        {
            const randomIndex = Math.floor(Math.random() * range.length)
            shuffledRange.push(range[randomIndex])
            range.splice(randomIndex, 1)
        }

        return shuffledRange
    }
}

export default Maths