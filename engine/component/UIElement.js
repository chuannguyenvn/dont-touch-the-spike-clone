import ComponentType from "./ComponentType.js";
import Renderer from "./Renderer.js";
import Vector from "../types/Vector.js";
class UIElement extends Renderer {
    constructor(owner) {
        super(owner);
        // COMPONENT METADATA //
        this._componentRequirements = [ComponentType.TRANSFORM];
        // COMPONENT PROPERTIES //
        this.anchor = Alignment.MID_CENTER;
        this.pivot = Alignment.MID_CENTER;
    }
    _draw() {
        let normalizedCoordinate = Vector.zero();
        switch (this.pivot) {
            case Alignment.TOP_LEFT:
                normalizedCoordinate = new Vector(0, 0);
                break;
            case Alignment.TOP_CENTER:
                normalizedCoordinate = new Vector(-0.5, 0);
                break;
            case Alignment.TOP_RIGHT:
                normalizedCoordinate = new Vector(-1, 0);
                break;
            case Alignment.MID_LEFT:
                normalizedCoordinate = new Vector(0, -0.5);
                break;
            case Alignment.MID_CENTER:
                normalizedCoordinate = new Vector(-0.5, -0.5);
                break;
            case Alignment.MID_RIGHT:
                normalizedCoordinate = new Vector(-1, -0.5);
                break;
            case Alignment.BOTTOM_LEFT:
                normalizedCoordinate = new Vector(0, -1);
                break;
            case Alignment.BOTTOM_CENTER:
                normalizedCoordinate = new Vector(-0.5, -1);
                break;
            case Alignment.BOTTOM_RIGHT:
                normalizedCoordinate = new Vector(-1, -1);
                break;
        }
        this.drawable._draw(this.elementSize.multiplyComp(normalizedCoordinate));
    }
}
var Alignment;
(function (Alignment) {
    Alignment[Alignment["TOP_LEFT"] = 0] = "TOP_LEFT";
    Alignment[Alignment["TOP_CENTER"] = 1] = "TOP_CENTER";
    Alignment[Alignment["TOP_RIGHT"] = 2] = "TOP_RIGHT";
    Alignment[Alignment["MID_LEFT"] = 3] = "MID_LEFT";
    Alignment[Alignment["MID_CENTER"] = 4] = "MID_CENTER";
    Alignment[Alignment["MID_RIGHT"] = 5] = "MID_RIGHT";
    Alignment[Alignment["BOTTOM_LEFT"] = 6] = "BOTTOM_LEFT";
    Alignment[Alignment["BOTTOM_CENTER"] = 7] = "BOTTOM_CENTER";
    Alignment[Alignment["BOTTOM_RIGHT"] = 8] = "BOTTOM_RIGHT";
})(Alignment || (Alignment = {}));
export { UIElement, Alignment };
//# sourceMappingURL=UIElement.js.map