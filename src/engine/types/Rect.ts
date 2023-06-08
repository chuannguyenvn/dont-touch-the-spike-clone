import Vector from "./Vector"

class Rect
{
    public center: Vector
    public size: Vector

    constructor(center: Vector, size: Vector) {
        this.center = center
        this.size = size
    }

    public isPointInside(point: Vector) {
        return point.x >= this.center.x - this.size.x / 2 &&
            point.x <= this.center.x + this.size.x / 2 &&
            point.y >= this.center.y - this.size.y / 2 &&
            point.y <= this.center.y + this.size.y / 2

    }
}

export default Rect