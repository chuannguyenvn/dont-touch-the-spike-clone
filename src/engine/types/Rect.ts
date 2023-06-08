import Vector from "./Vector"

class Rect
{
    public center: Vector
    public size: Vector

    constructor(center: Vector, size: Vector)
    {
        this.center = center
        this.size = size
    }
}

export default Rect