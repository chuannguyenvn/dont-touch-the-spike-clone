import BirdGame from "./game/BirdGame"

class Game
{
    constructor() {
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
