import Wall from "./Wall"
import Spike from "./Spike"
import Vector from "../../engine/math/Vector"
import Maths from "../../engine/math/Maths"
import BirdGame from "../BirdGame"
import GameState from "../GameState"

class VerticalWall extends Wall
{
    constructor(name: string) {
        super(name)
        BirdGame.gameStateChanged.subscribe(this.stateChangedHandler.bind(this))
    }

    public start(): void {
        this.collider.size = new Vector(100, 600)

        for (let y = -200; y <= 200; y += 50)
        {
            const spike = new Spike("Spike")
            spike.setParent(this)
            spike.transform.position = new Vector(this.transform.position.x, y)
            spike.start()

            this.spikes.push(spike)
        }
    }

    public showSpike(): void {
        this.collider.isActive = true
        const spikeCount = this.difficultyFunction(BirdGame.currentScore)
        const spikeIndices = Maths.randomIntBag(0, this.spikes.length, spikeCount)
        for (let i = 0; i < spikeIndices.length; i++)
        {
            this.spikes[spikeIndices[i]].show()
        }
    }

    public hideSpike(): void {
        this.collider.isActive = false
        for (let i = 0; i < this.spikes.length; i++)
        {
            this.spikes[i].hide()
        }
    }

    private stateChangedHandler(gameState: GameState): void {
        if (gameState === GameState.WELCOME)
        {
            this.hideSpike()
            this.showSpike()
        }
    }

    private difficultyFunction(x: number): number {
        if (x == 0) return 0
        return Math.floor(Math.log(x + 2) / Math.log(1.6) * 0.8)
    }
}

export default VerticalWall