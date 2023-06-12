class GUID {
    private static currentId = 0

    public static getId(): number {
        return this.currentId++
    }
}

export default GUID
