import Resource from './Resource'
import SoundClip from '../configs-and-resources/SoundClips'

class Sound {
    // -1 means at least one clip's volume is different form global volume
    public static globalVolume: number = 1

    public static _init(globalVolume: number): void {
        this.globalVolume = globalVolume
    }

    public static playOnce(clip: SoundClip): void {
        const audio =new Audio(clip)
        audio.loop = false
        audio.play()
    }

    public static playLoop(clip: SoundClip): void {
        const audio = Resource._sounds.get(clip) as HTMLAudioElement
        audio.loop = true
        audio.play()
    }

    public static pause(clip: SoundClip): void {
        const audio = Resource._sounds.get(clip) as HTMLAudioElement
        audio.pause()
    }

    public static end(clip: SoundClip): void {
        const audio = Resource._sounds.get(clip) as HTMLAudioElement
        audio.loop = false
        audio.pause()
        audio.currentTime = 0
    }

    public static getClipVolume(clip: SoundClip): number {
        const audio = Resource._sounds.get(clip) as HTMLAudioElement
        return audio.volume
    }

    public static setClipVolume(clip: SoundClip, volume: number): void {
        const audio = Resource._sounds.get(clip) as HTMLAudioElement
        audio.volume = volume
        Sound.globalVolume = -1
    }

    public static setGlobalVolume(volume: number): void {
        Resource._sounds.forEach((audio, _) => {
            audio.volume = volume
        })
        Sound.globalVolume = volume
    }

    public static setMaxVolume(): void {
        Sound.setGlobalVolume(1)
    }

    public static mute(): void {
        Sound.setGlobalVolume(0)
    }
}

export default Sound
