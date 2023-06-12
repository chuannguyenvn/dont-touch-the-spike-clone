class GUID {
    private static currentId = 0

    public static getId(): number {
        console.log("GUID: " + this.currentId)
        return this.currentId++
    }
}

export default GUID
