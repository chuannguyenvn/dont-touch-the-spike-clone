import Sprite from './Sprite'
import Canvas from '../system/Canvas'

class NineSlice extends Sprite {
    public _draw(): void {
        const s = this._image.width / 3

        const part1: [number, number, number, number] = [0, 0, s, s]
        const part2: [number, number, number, number] = [s, 0, s, s]
        const part3: [number, number, number, number] = [s * 2, 0, s, s]
        const part4: [number, number, number, number] = [0, s, s, s]
        const part5: [number, number, number, number] = [s, s, s, s]
        const part6: [number, number, number, number] = [s * 2, s, s, s]
        const part7: [number, number, number, number] = [0, s * 2, s, s]
        const part8: [number, number, number, number] = [s, s * 2, s, s]
        const part9: [number, number, number, number] = [s * 2, s * 2, s, s]

        const width = this.width
        const height = this.height

        Canvas._canvasContext.drawImage(
            this._image,
            ...part1,
            -width / 2,
            -height / 2,
            s,
            s
        )
        Canvas._canvasContext.drawImage(
            this._image,
            ...part3,
            width - s - width / 2,
            -height / 2,
            s,
            s
        )
        Canvas._canvasContext.drawImage(
            this._image,
            ...part7,
            -width / 2,
            height - s - height / 2,
            s,
            s
        )
        Canvas._canvasContext.drawImage(
            this._image,
            ...part9,
            width - s - width / 2,
            height - s - height / 2,
            s,
            s
        )
        Canvas._canvasContext.drawImage(
            this._image,
            ...part2,
            s - width / 2,
            -height / 2,
            width - 2 * s,
            s
        )
        Canvas._canvasContext.drawImage(
            this._image,
            ...part8,
            s - width / 2,
            height - s - height / 2,
            width - 2 * s,
            s
        )
        Canvas._canvasContext.drawImage(
            this._image,
            ...part4,
            -width / 2,
            s - height / 2,
            s,
            height - 2 * s
        )
        Canvas._canvasContext.drawImage(
            this._image,
            ...part6,
            width - s - width / 2,
            s - height / 2,
            s,
            height - 2 * s
        )
        Canvas._canvasContext.drawImage(
            this._image,
            ...part5,
            s - width / 2,
            s - height / 2,
            width - 2 * s,
            height - 2 * s
        )
    }
}

export default NineSlice
