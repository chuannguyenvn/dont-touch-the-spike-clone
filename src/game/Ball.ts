import Node from '../engine/node/Node'
import Transform from '../engine/node/component/Transform'
import Rigidbody from '../engine/node/component/Rigidbody'
import ComponentType from '../engine/node/component/ComponentType'
import CircleCollider from '../engine/node/component/CircleCollider'
import Renderer from '../engine/node/component/Renderer'
import Circle from '../engine/rendering/Circle'
import Color from '../engine/math/Color'
import Vector from '../engine/math/Vector'
import Maths from '../engine/math/Maths'

class Ball extends Node {
    public transform: Transform
    public collider: CircleCollider
    public rigidbody: Rigidbody
    public renderer: Renderer
    public circle: Circle

    constructor(name: string) {
        super(name)

        const radius = Maths.randomRange(10, 15)

        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        this.collider = this.addComponent(ComponentType.CIRCLE_COLLIDER) as CircleCollider
        this.collider.radius = radius

        this.rigidbody = this.addComponent(ComponentType.RIGIDBODY) as Rigidbody

        this.circle = new Circle(radius, Color.RANDOM_OPAQUE)
        this.renderer = this.addComponent(ComponentType.RENDERER) as Renderer
        this.renderer.setDrawable(this.circle)
    }

    public setPosition(pos: Vector): void {
        this.transform.position = pos
    }

    public setColor(color: Color): void {
        this.circle.color = color
    }

    public setSize(size: number): void {
        this.collider.radius = size
        this.circle.size = size
    }

    public setVelocity(vel: Vector) {
        this.rigidbody.setVelocity(vel)
    }
}

export default Ball
