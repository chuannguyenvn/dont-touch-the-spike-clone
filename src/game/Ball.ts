import Node from '../engine/node/Node'
import Transform from '../engine/node/component/Transform'
import Rigidbody from '../engine/node/component/Rigidbody'
import ComponentType from '../engine/node/component/ComponentType'
import CircleCollider from '../engine/node/component/CircleCollider'
import Renderer from '../engine/node/component/Renderer'
import Circle from '../engine/rendering/Circle'
import Color from '../engine/math/Color'

class Ball extends Node {
    public transform: Transform
    public collider: CircleCollider
    public rigidbody: Rigidbody
    public renderer: Renderer
    public circle: Circle

    constructor(name: string) {
        super(name)

        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        this.collider = this.addComponent(ComponentType.CIRCLE_COLLIDER) as CircleCollider

        this.rigidbody = this.addComponent(ComponentType.RIGIDBODY) as Rigidbody

        this.circle = new Circle(50, Color.BLACK)
        this.renderer = this.addComponent(ComponentType.RENDERER) as Renderer
        this.renderer.setDrawable(this.circle)
    }

    update() {
        console.log(this.transform.position.y)
    }
}

export default Ball
