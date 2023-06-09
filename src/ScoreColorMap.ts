import Color from "./engine/types/Color"

function getColor(score: number): Color {
    if (score < 5) return Color.GREY
    if (score < 10) return Color.BLUE
    if (score < 15) return Color.GREEN
    if (score < 20) return Color.RED
    if (score < 25) return Color.YELLOW
    if (score < 30) return Color.CYAN
    return Color.BLACK
}

export default getColor