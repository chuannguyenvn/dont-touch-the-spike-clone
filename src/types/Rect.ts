import Vector2 from "./Vector2.js"

class Rect
{
    public center: Vector2
    public size: Vector2

    constructor(center: Vector2, size: Vector2)
    {
        this.center = center
        this.size = size
    }
}

export default Rect