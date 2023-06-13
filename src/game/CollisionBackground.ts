import Node from '../engine/node/Node'
import Transform from '../engine/node/component/Transform'
import RectangleCollider from '../engine/node/component/RectangleCollider'
import Renderer from '../engine/node/component/Renderer'
import ComponentType from '../engine/node/component/ComponentType'
import Color from '../engine/math/Color'
import CircleShape from '../engine/rendering/CircleShape'
import Physics from '../engine/system/Physics'

class CollisionBackground extends Node {
    public transform: Transform
    public collider: RectangleCollider
    public renderer: Renderer
    private circle: CircleShape

    constructor(name: string) {
        super(name)

        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        this.circle = new CircleShape(Physics.constraintRadius, new Color(0.1, 0.1, 0.1, 1))
        this.renderer = this.addComponent(ComponentType.RENDERER) as Renderer
        this.renderer.setDrawable(this.circle)
        this.renderer.drawOrder = -100
    }
}

export default CollisionBackground
