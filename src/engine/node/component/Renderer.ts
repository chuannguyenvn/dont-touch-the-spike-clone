import Component from './Component'
import ComponentType from './ComponentType'
import Node from '../Node'
import Transform from './Transform'
import Canvas from '../../system/Canvas'
import Drawable from '../../rendering/Drawable'
import Matrix from '../../math/Matrix'
import Ease from '../../utility/tween/Ease'
import Tween from '../../utility/tween/Tween'
import Maths from '../../math/Maths'
import Color from '../../math/Color'
import DrawLayer from '../../configs-and-resources/DrawLayers'

class Renderer extends Component {
    // COMPONENT METADATA //
    public readonly type: ComponentType = ComponentType.RENDERER
    public readonly _componentRequirements: ComponentType[] = [ComponentType.TRANSFORM]

    // COMPONENT PROPERTIES //
    public drawOrder = 0
    public drawable: Drawable
    private ownerTransform: Transform

    constructor(owner: Node) {
        super(owner)
        this.ownerTransform = owner.getComponent(ComponentType.TRANSFORM) as Transform

        Canvas._registerRenderer(this)
    }

    private _drawLayer: DrawLayer = DrawLayer.DEFAULT

    public get drawLayer(): DrawLayer {
        return this._drawLayer
    }

    public set drawLayer(value: DrawLayer) {
        Canvas._unregisterRenderer(this)
        this._drawLayer = value
        Canvas._registerRenderer(this)
    }

    public _localToWorldMatrix(): Matrix {
        return this.ownerTransform._localToWorldMatrix()
    }

    public setDrawable(drawable: Drawable): void {
        this.drawable = drawable
    }

    public _draw(deltaTime: number): void {
        if (!this.drawable) return
        
        let node: Node | null = this.owner
        while (node) {
            if (!node.isVisible) return
            node = node.parentNode
        }
        this.drawable._draw()
    }

    public tweenColor(
        to: Color,
        duration: number,
        delay: number,
        ease: Ease,
        relative: boolean
    ): Tween<Color> {
        const evaluate = (x: number) => {
            if (relative) to.add(tween._startValue)
            this.drawable.color = Maths.lerpColor(x, tween._startValue, to)
        }

        const tween = new Tween<Color>(evaluate, () => this.drawable.color, duration, delay, ease)
        return tween
    }
}

export default Renderer
