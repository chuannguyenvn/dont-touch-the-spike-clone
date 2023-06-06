class Debug {
    static assert(condition, message) {
        console.assert(condition, message);
    }
    static log(message) {
        // Can save the logged message into a txt
        console.log(message);
    }
    static logError(message) {
        console.error(message);
    }
}
export default Debug;
//# sourceMappingURL=Debug.js.map