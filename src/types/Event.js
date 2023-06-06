class GameEvent {
    constructor() {
        this.eventCallbacks = [];
    }
    subscribe(callback) {
        this.eventCallbacks.push(callback);
    }
    unsubscribe() {
        // TODO
    }
    invoke() {
        for (let callback of this.eventCallbacks) {
            callback();
        }
    }
}
class ParamGameEvent {
    constructor() {
        this.eventCallbacks = [];
    }
    subscribe(callback) {
        this.eventCallbacks.push(callback);
    }
    unsubscribe() {
        // TODO
    }
    invoke(arg) {
        for (let callback of this.eventCallbacks) {
            callback(arg);
        }
    }
}
export { GameEvent, ParamGameEvent };
//# sourceMappingURL=Event.js.map