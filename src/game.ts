import BirdGame from "./BirdGame"

class Game
{
    constructor() {
        console.log('Game created')

        const game = document.getElementById("game")
        const canvas = document.createElement("canvas")
        canvas.id = "canvas"
        canvas.width = 400
        canvas.height = 600
        game?.appendChild(canvas)

        BirdGame.init(canvas.getContext("2d") as CanvasRenderingContext2D)
    }
}

new Game()
