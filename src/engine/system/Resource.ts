import Sprite from '../rendering/Sprite'
import Sound from './Sound'
import SoundClip from '../configs-and-resources/SoundClips'
import SpriteType from '../configs-and-resources/SpriteTypes'

class Resource {
    public static _sprites: Map<SpriteType, Sprite> = new Map<SpriteType, Sprite>()
    public static _sounds: Map<SoundClip, HTMLAudioElement> = new Map<SoundClip, HTMLAudioElement>()

    public static _init() {
        Object.values(SpriteType).forEach((value, _) => {
            const sprite = new Sprite(value)
            Resource._sprites.set(value as SpriteType, sprite)
        })

        Object.values(SoundClip).forEach((value, _) => {
            const audio = new Audio(value)
            audio.volume = Sound.globalVolume
            Resource._sounds.set(value as SoundClip, audio)
        })
    }

    public static getSprite(spriteType: SpriteType): Sprite {
        return Resource._sprites.get(spriteType) as Sprite
    }

    public static getSoundClip(soundClip: SoundClip): HTMLAudioElement {
        return Resource._sounds.get(soundClip) as HTMLAudioElement
    }
}

export default Resource
