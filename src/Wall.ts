import Node from "./engine/node/Node"
import Transform from "./engine/component/Transform"
import Renderer from "./engine/component/Renderer"
import ComponentType from "./engine/component/ComponentType"
import Vector from "./engine/types/Vector"
import RectangleCollider from "./engine/component/RectangleCollider"
import Rectangle from "./engine/types/Rectangle"
import Color from "./engine/types/Color"
import Spike from "./Spike"
import Maths from "./engine/utility/Maths"

class Wall extends Node
{
    public transform: Transform
    public collider: RectangleCollider
    private spikes: Spike[] = []

    constructor(name: string)
    {
        super(name)
        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        this.collider = this.addComponent(ComponentType.RECTANGLE_COLLIDER) as RectangleCollider
        this.collider.size = new Vector(100, 600)
    }
    
    public start()
    {
        for (let y = -200; y <= 200; y += 50)
        {
            let spike = new Spike("Spike")
            spike.setParent(this)
            spike.transform.position = new Vector(this.transform.position.x, y)
            spike.start()

            this.spikes.push(spike)
        }

        console.log(this.transform.position)
    }

    public showSpike()
    {
        for (let i = 0; i < this.spikes.length; i++)
        {
            if (Maths.randomRangeInt(0, 2) == 0)
            {
                this.spikes[i].show()
            }
        }
    }

    public hideSpike()
    {
        for (let i = 0; i < this.spikes.length; i++)
        {
            this.spikes[i].hide()
        }
    }
}

export default Wall