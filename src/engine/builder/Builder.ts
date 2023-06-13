import CanvasBuildOptions from './build-options/CanvasBuildOptions'
import { InputBuildOptions } from './build-options/InputBuildOptions'
import DebugBuildOptions from './build-options/DebugBuildOptions'
import SoundBuildOptions from './build-options/SoundBuildOptions'

abstract class Builder {
    public abstract buildDebug(debugBuildOptions: DebugBuildOptions): void

    public abstract buildTime(): void

    public abstract buildCanvas(canvasBuildOptions: CanvasBuildOptions): void

    public abstract buildInput(inputBuildOptions: InputBuildOptions): void

    public abstract buildSound(soundBuildOptions: SoundBuildOptions): void

    public abstract buildSystem(): void

    public abstract loadResource(): void
}

export default Builder
