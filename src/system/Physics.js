import RectangleCollider from "../component/RectangleCollider";
import CircleCollider from "../component/CircleCollider";
import Vector2 from "../types/Vector2";
class Physics {
    static registerCollider(collider) {
        this.colliders.push(collider);
    }
    static handlePhysics() {
        for (let i = 0; i < this.colliders.length; i++) {
            for (let j = i + 1; i < this.colliders.length; i++) {
                if (this.colliders[i] instanceof RectangleCollider) {
                    let collider1 = this.colliders[i];
                    if (this.colliders[j] instanceof RectangleCollider) {
                        let collider2 = this.colliders[i];
                        // let pos1 = collider1.getWorldPosition()
                        // let pos2 = collider2.getWorldPosition()
                        // let size1 = collider1.size
                        // let size2 = collider2.size
                        // if (Vector2.distance(pos1, pos2) > size1 + size2)
                        // {
                        //     Physics.broadcastCollision(collider1, collider2)
                        // }
                    }
                    else if (this.colliders[j] instanceof CircleCollider) {
                        let collider2 = this.colliders[i];
                    }
                }
                else if (this.colliders[i] instanceof CircleCollider) {
                    let collider1 = this.colliders[i];
                    if (this.colliders[j] instanceof RectangleCollider) {
                        let collider2 = this.colliders[i];
                    }
                    else if (this.colliders[j] instanceof CircleCollider) {
                        let collider2 = this.colliders[i];
                        let pos1 = collider1.getWorldPosition();
                        let pos2 = collider2.getWorldPosition();
                        let size1 = collider1.size;
                        let size2 = collider2.size;
                        if (Vector2.distance(pos1, pos2) > size1 + size2) {
                            Physics.broadcastCollision(collider1, collider2);
                        }
                    }
                }
            }
        }
    }
    static broadcastCollision(collider1, collider2) {
    }
}
Physics.colliders = [];
//# sourceMappingURL=Physics.js.map