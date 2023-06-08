import Wall from "./Wall"
import Spike from "./Spike"
import Vector from "./engine/types/Vector"
import Maths from "./engine/utility/Maths"
import BirdGame from "./BirdGame"
import GameState from "./GameState"

class VerticalWall extends Wall
{

    constructor(name: string)
    {
        super(name)
        BirdGame.gameStateChanged.subscribe(this.stateChangedHandler.bind(this))
    }

    private stateChangedHandler(gameState: GameState)
    {
        if (gameState === GameState.WELCOME)
        {
            this.hideSpike()
        }
    }

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
        let spikeCount = this.difficultyFunction(BirdGame.currentScore)
        let spikeIndices = Maths.randomIntBag(0, this.spikes.length, spikeCount)
        for (let i = 0; i < spikeIndices.length; i++)
        {
            this.spikes[spikeIndices[i]].show()
        }
    }

    public hideSpike()
    {
        for (let i = 0; i < this.spikes.length; i++)
        {
            this.spikes[i].hide()
        }
    }
    
    private difficultyFunction(x: number)
    {
        return Math.floor(Math.log(x + 2) / Math.log(1.6))
    }
}

export default VerticalWall