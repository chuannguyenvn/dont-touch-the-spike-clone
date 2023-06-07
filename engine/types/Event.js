class GameEvent {
    constructor() {
        this._eventCallbacks = [];
    }
    subscribe(callback) {
        this._eventCallbacks.push(callback);
    }
    unsubscribe() {
        // TODO
    }
    invoke() {
        for (let callback of this._eventCallbacks) {
            callback();
        }
    }
}
class ParamGameEvent {
    constructor() {
        this._eventCallbacks = [];
    }
    subscribe(callback) {
        this._eventCallbacks.push(callback);
    }
    unsubscribe() {
        // TODO
    }
    invoke(arg) {
        for (let callback of this._eventCallbacks) {
            callback(arg);
        }
    }
}
export { GameEvent, ParamGameEvent };
//# sourceMappingURL=Event.js.map