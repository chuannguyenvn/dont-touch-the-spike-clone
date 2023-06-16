import Wall from './Wall'
import Spike from './Spike'
import Vector from '../../engine/math/Vector'
import Maths from '../../engine/math/Maths'
import BirdGame from '../BirdGame'
import GameState from '../GameState'
import Candy from './Candy'

class VerticalWall extends Wall {
    constructor(name: string) {
        super(name)
        BirdGame.stateMachine.configure(GameState.WELCOME).onEntry(this.getGuid(), () => {
            this.hideSpike()
            this.showSpike()
        })
    }

    public start(): void {
        this.collider.size = new Vector(100, 600)

        for (let y = -200; y <= 200; y += 50) {
            const spike = new Spike('Spike')
            spike.setParent(this)
            spike.transform.globalPosition = new Vector(this.transform.globalPosition.x, y)
            spike.start()

            this.spikes.push(spike)
        }
    }

    public showSpike(): void {
        this.collider.isActive = true
        const spikeCount = this.difficultyFunction(BirdGame.currentScore)
        const spikeIndices = Maths.randomIntBag(0, this.spikes.length, spikeCount + 1)
        for (let i = 0; i < spikeIndices.length - 1; i++) {
            this.spikes[spikeIndices[i]].show()
        }

        if (BirdGame.stateMachine.currentState === GameState.PLAY && Math.random() < 0.35) {
            const yPos =
                this.spikes[spikeIndices[spikeIndices.length - 1]].transform.globalPosition.y
            const candy = new Candy('Candy')
            candy.transform.globalPosition = new Vector(
                Maths.sign(this.transform.globalPosition.x) * 150,
                yPos
            )
            candy.start()
        }
    }

    public hideSpike(): void {
        this.collider.isActive = false
        for (let i = 0; i < this.spikes.length; i++) {
            this.spikes[i].hide()
        }
    }

    private difficultyFunction(x: number): number {
        if (x == 0) return 0
        return Math.floor((Math.log(x + 2) / Math.log(1.6)) * 0.8)
    }
}

export default VerticalWall
