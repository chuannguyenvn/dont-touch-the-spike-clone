import Sprite from '../rendering/Sprite'

class Resource {
    public static _sprites: Sprite[]
    public static _sounds: Map<SoundClip, HTMLAudioElement> = new Map<SoundClip, HTMLAudioElement>()
}

enum SoundClip {
    POP = 'https://cdn.pixabay.com/audio/2022/03/17/audio_bc9b676777.mp3',
}

enum SpriteType {
    BIRD_JUMP = 'assets/Jump.png',
    BIRD_GLIDE = 'assets/Glide.png',
}

export { Resource, SoundClip }
