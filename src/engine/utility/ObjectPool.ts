import Node from '../node/Node'

class ObjectPool<T extends Node> {
    private createFunction: () => T
    private _pool: T[] = []

    constructor(createFunction: () => T, initCount: number = 1) {
        this.createFunction = createFunction

        for (let i = 0; i < initCount; i++) {
            const object = this.createFunction()
            object.isActive = object.isVisible = false
            this._pool.push(object)
        }
    }

    public getObject(): T {
        for (let i = 0; i < this._pool.length; i++) {
            if (this._pool[i].isActive) continue

            this._pool[i].isActive = this._pool[i].isVisible = true
            return this._pool[i]
        }

        console.log('new')
        return this.createNewObjects(this._pool.length)
    }

    public returnObject(poolable: T): void {
        poolable.isActive = poolable.isVisible = false
    }

    private createNewObjects(count: number): T {
        const object = this.createFunction()
        object.isActive = object.isVisible = false
        this._pool.push(object)
        for (let i = 0; i < count; i++) {
            this._pool.push(object)
        }

        this._pool[count].isActive = this._pool[count].isVisible = true
        return this._pool[count]
    }
}

export default ObjectPool
