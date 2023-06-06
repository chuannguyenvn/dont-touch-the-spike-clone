interface Updatable
{
    // deltaTime is in seconds.
    update: (deltaTime: number) => void;
}

export default Updatable;