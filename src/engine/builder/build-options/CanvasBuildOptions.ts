﻿import Vector from '../../math/Vector'

class CanvasBuildOptions {
    public readonly canvasSize: Vector

    constructor(canvasSize: Vector) {
        this.canvasSize = canvasSize
    }
}

export default CanvasBuildOptions
