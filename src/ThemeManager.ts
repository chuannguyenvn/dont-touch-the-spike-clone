import Color from "./engine/types/Color"


class ThemeManager
{
    public static getPrimaryColor(score: number): Color {
        if (score < 5) return Color.GREY
        if (score < 10) return Color.fromHex("1982c4")
        if (score < 15) return Color.fromHex("ff924c")
        if (score < 20) return Color.fromHex("8ac926")
        if (score < 25) return Color.fromHex("ff595e")
        if (score < 30) return Color.fromHex("ffca3a")
        return Color.fromHex("6a4c93")
    }

    public static getSecondaryColor(score: number): Color {
        if (score < 5) return Color.WHITE
        if (score < 10) return Color.fromHex("d3eefc")
        if (score < 15) return Color.fromHex("ffe7e5")
        if (score < 20) return Color.fromHex("e2f0cb")
        if (score < 25) return Color.fromHex("ff9aa2")
        if (score < 30) return Color.fromHex("fcf6bd")
        return Color.fromHex("c7ceea")
    }
}

export default ThemeManager
