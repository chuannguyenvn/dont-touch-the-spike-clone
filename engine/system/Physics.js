import RectangleCollider from "../component/RectangleCollider.js";
import CircleCollider from "../component/CircleCollider.js";
import Vector from "../types/Vector.js";
class Physics {
    static registerCollider(collider) {
        this.colliders.push(collider);
    }
    static handlePhysics() {
        for (let i = 0; i < this.colliders.length; i++) {
            for (let j = i + 1; j < this.colliders.length; j++) {
                if (this.colliders[i] instanceof RectangleCollider) {
                    let collider1 = this.colliders[i];
                    if (this.colliders[j] instanceof RectangleCollider) {
                        let collider2 = this.colliders[j];
                        let pos1 = collider1.getWorldPosition();
                        let pos2 = collider2.getWorldPosition();
                        let size1 = collider1.size;
                        let size2 = collider2.size;
                        if (Math.abs(pos1.subtract(pos2).x) < size1.x + size2.x &&
                            Math.abs(pos1.subtract(pos2).y) < size1.y + size2.y) {
                            Physics.broadcastCollision(collider1, collider2);
                        }
                    }
                    else if (this.colliders[j] instanceof CircleCollider) {
                        let collider2 = this.colliders[j];
                    }
                }
                else if (this.colliders[i] instanceof CircleCollider) {
                    let collider1 = this.colliders[i];
                    if (this.colliders[j] instanceof RectangleCollider) {
                        let collider2 = this.colliders[j];
                    }
                    else if (this.colliders[j] instanceof CircleCollider) {
                        let collider2 = this.colliders[j];
                        let pos1 = collider1.getWorldPosition();
                        let pos2 = collider2.getWorldPosition();
                        let size1 = collider1.size;
                        let size2 = collider2.size;
                        if (Vector.distance(pos1, pos2) > size1 + size2) {
                            Physics.broadcastCollision(collider1, collider2);
                        }
                    }
                }
            }
        }
    }
    static broadcastCollision(collider1, collider2) {
        collider1.addCollidingCollider(collider2);
        collider2.addCollidingCollider(collider1);
    }
}
Physics.colliders = [];
export default Physics;
//# sourceMappingURL=Physics.js.map