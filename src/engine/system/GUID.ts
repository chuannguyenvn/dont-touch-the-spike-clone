class GUID {
    private static currentId: number = 0

    public static getId(): number {
        return this.currentId++
    }
}

export default GUID
