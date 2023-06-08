import Wall from "./Wall"
import Spike from "./Spike"
import Vector from "./engine/types/Vector"
import Maths from "./engine/utility/Maths"

class VerticalWall extends Wall
{
    public start()
    {
        this.collider.size = new Vector(100, 600)

        for (let y = -200; y <= 200; y += 50)
        {
            let spike = new Spike("Spike")
            spike.setParent(this)
            spike.transform.position = new Vector(this.transform.position.x, y)
            spike.start()

            this.spikes.push(spike)
        }
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

export default VerticalWall