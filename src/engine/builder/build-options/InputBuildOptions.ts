class InputBuildOptions {
    public readonly inputOptions: InputOption[]

    constructor(inputOptions: InputOption[]) {
        this.inputOptions = inputOptions
    }
}

enum InputOption {
    MOUSE,
    KEYBOARD,
    TOUCH,
}

export {InputBuildOptions, InputOption}
