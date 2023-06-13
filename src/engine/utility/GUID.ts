class GUID {
    private static currentId = 0

    public static generate(): number {
        return this.currentId++
    }
}

export default GUID
