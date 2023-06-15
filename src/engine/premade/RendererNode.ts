import Transform from '../node/component/Transform'
import Renderer from '../node/component/Renderer'
import Node from '../node/Node'
import ComponentType from '../node/component/ComponentType'

class RendererNode extends Node {
    public transform: Transform
    public renderer: Renderer

    constructor(name: string) {
        super(name)

        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform
        this.renderer = this.addComponent(ComponentType.RENDERER) as Renderer
    }
}

export default RendererNode
