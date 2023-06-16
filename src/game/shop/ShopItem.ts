import Node from '../../engine/node/Node'
import Transform from '../../engine/node/component/Transform'
import ComponentType from '../../engine/node/component/ComponentType'
import ButtonNode from '../../engine/premade/ButtonNode'
import RendererNode from '../../engine/premade/RendererNode'
import SkinData from './SkinData'
import Timer from '../../engine/utility/Timer'
import NineSliceType from '../../engine/configs-and-resources/NineSliceTypes'
import NineSlice from '../../engine/rendering/NineSlice'
import Color from '../../engine/math/Color'
import Vector from '../../engine/math/Vector'
import Time from '../../engine/system/Time'
import BirdGame from '../BirdGame'
import SkinType from './SkinType'
import Shop from './Shop'

class ShopItem extends Node {
    public transform: Transform
    public buttonNode: ButtonNode
    public skin: RendererNode

    private skinData: SkinData
    private isJumping: boolean = true
    private purchased: boolean = false

    constructor(name: string, skinData: SkinData) {
        super(name)
        this.skinData = skinData

        this.transform = this.addComponent(ComponentType.TRANSFORM) as Transform

        this.buttonNode = new ButtonNode(
            'Purchase button',
            new NineSlice(NineSliceType.BUTTON_IDLE),
            new NineSlice(NineSliceType.BUTTON_HOVERED)
        )
        this.buttonNode.setButtonSize(new Vector(100, 50))
        this.buttonNode.setParent(this)
        this.buttonNode.transform.localPosition = new Vector(0, -50)
        this.buttonNode.textContent.text = skinData.price.toString()
        this.buttonNode.textContent.color = Color.WHITE
        this.buttonNode.text.drawable.offSet = new Vector(-500, 0)
        this.buttonNode.button.clicked.subscribe(this.purchase.bind(this))

        this.skin = new RendererNode('Skin')
        this.skin.setParent(this)

        this.skin.renderer.setDrawable(skinData.jumpSprite)

        new Timer(
            () => {
                this.skin.renderer.setDrawable(
                    this.isJumping ? skinData.jumpSprite : skinData.glideSprite
                )
                this.isJumping = !this.isJumping
            },
            0,
            -1,
            1
        )

        Shop.changeSkin.subscribe(this.changeSkinHandler.bind(this))
    }

    update() {
        this.skin.transform.localPosition = this.skin.transform.localPosition.withY(
            Math.sin(Time.timeSinceGameStart()) * 5
        )
    }

    private purchase(): void {
        if (BirdGame.candyCount < this.skinData.price) return
        this.purchased = true
        BirdGame.candyCount -= this.skinData.price
        BirdGame.unlockedSkins.push(this.skinData.skinType)
        this.buttonNode.button.clicked.unsubscribe(this.purchase)
        this.buttonNode.button.clicked.subscribe(() =>
            Shop.changeSkin.invoke(this.skinData.skinType)
        )
        Shop.changeSkin.invoke(this.skinData.skinType)
    }

    private changeSkinHandler(skinType: SkinType) {
        if (!this.purchased) return
        if (skinType === this.skinData.skinType)
        {
            this.buttonNode.textContent.text = 'ON'
            BirdGame.currentSkin = this.skinData
        }
        else {
            this.buttonNode.textContent.text = 'OFF'
        }
    }
}

export default ShopItem
