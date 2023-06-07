class Maths
{
    public static rad2Deg: number = 180 / Math.PI
    public static deg2Rad: number = Math.PI / 180
    
    public static clamp(val: number, min: number,  max: number)
    {
        if (val < min) return min
        if (val > max) return max
        return val
    }
}

export default Maths