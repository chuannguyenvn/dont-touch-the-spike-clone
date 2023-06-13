import Sprite from '../rendering/Sprite'
import Sound from './Sound'

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

enum SoundClip {
    POP = 'https://cdn.pixabay.com/audio/2022/03/17/audio_bc9b676777.mp3',
}

enum SpriteType {
    BIRD_JUMP = 'assets/Jump.png',
    BIRD_GLIDE = 'assets/Glide.png',
}

export { Resource, SoundClip, SpriteType }
