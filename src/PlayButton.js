import Node from "../engine/node/Node.js";
import ComponentType from "../engine/component/ComponentType.js";
import Vector from "../engine/types/Vector.js";
import Rectangle from "../engine/types/Rectangle.js";
import Color from "../engine/types/Color.js";
import { Alignment } from "../engine/component/UIElement.js";
import TextContent from "../engine/types/TextContent.js";
class PlayButton extends Node {
    init() {
        this.transform = this.addComponent(ComponentType.TRANSFORM);
        this.transform.position = new Vector(0, -300);
        this.button = this.addComponent(ComponentType.BUTTON);
        this.button.elementSize = new Vector(200, 100);
        this.button.setDrawable(new Rectangle(new Vector(200, 100), Color.red()));
        this.button.pivot = Alignment.BOTTOM_CENTER;
        this.text = this.addComponent(ComponentType.TEXT);
        this.text.setDrawable(new TextContent("Play", Color.blue()));
    }
}
export default PlayButton;
//# sourceMappingURL=PlayButton.js.map