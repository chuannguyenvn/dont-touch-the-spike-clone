import Wall from "./Wall"
import Spike from "./Spike"
import Vector from "./engine/types/Vector"
import Renderer from "./engine/component/Renderer"
import ComponentType from "./engine/component/ComponentType"
import Rectangle from "./engine/types/Rectangle"
import Color from "./engine/types/Color"
import Maths from "./engine/utility/Maths"

class HorizontalWall extends Wall
{
    private renderer: Renderer

    constructor(name: string)
    {
        super(name)
        this.renderer = this.addComponent(ComponentType.RENDERER) as Renderer
        this.renderer.drawOrder = 100
    }

    public start()
    {
        this.collider.size = new Vector(400, 100)

        for (let x = -200; x <= 200; x += 50)
        {
            let spike = new Spike("Spike")
            spike.setParent(this)
            
            let spikeXPos = x
            let spikeYPos = Maths.sign(this.transform.position.y) * 250
            spike.transform.position = new Vector(spikeXPos, spikeYPos)
            spike.start()

            this.spikes.push(spike)
        }

        let rectangle = new Rectangle(new Vector(400, 100), Color.grey())
        this.renderer.setDrawable(rectangle)
    }
}

export default HorizontalWall