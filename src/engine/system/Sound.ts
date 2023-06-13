import SoundClip from '../config/SoundClip'

class Sound {
    private static _sounds: Map<SoundClip, HTMLAudioElement> = new Map<
        SoundClip,
        HTMLAudioElement
    >()

    public static init() {
        Object.values(SoundClip).forEach((value, _) => {
            Sound._sounds.set(value as SoundClip, new Audio(value))
        })
    }

    public static playOnce(clip: SoundClip) {
        const audio = Sound._sounds.get(clip) as HTMLAudioElement
        audio.loop = false
        audio.play()
    }

    public static playLoop(clip: SoundClip) {
        const audio = Sound._sounds.get(clip) as HTMLAudioElement
        audio.loop = true
        audio.play()
    }

    public static pause(clip: SoundClip) {
        const audio = Sound._sounds.get(clip) as HTMLAudioElement
        audio.pause()
    }

    public static end(clip: SoundClip) {
        const audio = Sound._sounds.get(clip) as HTMLAudioElement
        audio.loop = false
        audio.pause()
        audio.currentTime = 0
    }

    public static setClipVolume(clip: SoundClip, volume: number) {
        const audio = Sound._sounds.get(clip) as HTMLAudioElement
        audio.volume = volume
    }

    public static setGlobalVolume(volume: number) {
        Sound._sounds.forEach((audio, _) => {
            audio.volume = volume
        })
    }
    
    public static setMaxVolume()
    {
        Sound.setGlobalVolume(1)
    }
    
    public static mute()
    {
        Sound.setGlobalVolume(0)
    }
}

export default Sound
