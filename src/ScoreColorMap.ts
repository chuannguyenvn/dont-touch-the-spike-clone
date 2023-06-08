import Color from "./engine/types/Color"

function getColor(score: number): Color {
    if (score < 5) return Color.grey()
    if (score < 10) return Color.blue()
    if (score < 15) return Color.green()
    if (score < 20) return Color.red()
    if (score < 25) return Color.yellow()
    if (score < 30) return Color.cyan()
    return Color.black()
}

export default getColor