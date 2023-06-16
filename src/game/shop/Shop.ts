import SkinData from './SkinData'
import Resource from '../../engine/system/Resource'
import SpriteType from '../../engine/configs-and-resources/SpriteTypes'
import Color from '../../engine/math/Color'
import Node from '../../engine/node/Node'
import ShopItem from './ShopItem'
import Vector from '../../engine/math/Vector'
import GameState from '../GameState'
import BirdGame from '../BirdGame'
import SkinType from './SkinType'
import ShopButton from './ShopButton'
import CandyCounter from './CandyCounter'
import { ParamGameEvent } from '../../engine/utility/Event'
import ButtonNode from '../../engine/premade/ButtonNode'
import NineSliceType from '../../engine/configs-and-resources/NineSliceTypes'
import NineSlice from '../../engine/rendering/NineSlice'

class Shop extends Node {
    public static changeSkin: ParamGameEvent<SkinType> = new ParamGameEvent<SkinType>()

    private skins: SkinData[] = [
        new SkinData(
            'Normie',
            SkinType.DEFAULT,
            Resource.getSprite(SpriteType.BIRD_DEFAULT_JUMP),
            Resource.getSprite(SpriteType.BIRD_DEFAULT_GLIDE),
            Color.fromHex('d62945'),
            0
        ),
        new SkinData(
            'Angry',
            SkinType.ANGRY,
            Resource.getSprite(SpriteType.BIRD_ANGRY_JUMP),
            Resource.getSprite(SpriteType.BIRD_ANGRY_GLIDE),
            Color.fromHex('283756'),
            1
        ),
        new SkinData(
            'Pinky',
            SkinType.PINKY,
            Resource.getSprite(SpriteType.BIRD_PINKY_JUMP),
            Resource.getSprite(SpriteType.BIRD_PINKY_GLIDE),
            Color.fromHex('ee4496'),
            2
        ),
        new SkinData(
            'Roundy',
            SkinType.ROUNDY,
            Resource.getSprite(SpriteType.BIRD_ROUND_JUMP),
            Resource.getSprite(SpriteType.BIRD_ROUND_GLIDE),
            Color.fromHex('3b5ba9'),
            3
        ),
        new SkinData(
            'Zomby',
            SkinType.ZOMBIE,
            Resource.getSprite(SpriteType.BIRD_ZOMBIE_JUMP),
            Resource.getSprite(SpriteType.BIRD_ZOMBIE_GLIDE),
            Color.fromHex('09aa4b'),
            4
        ),
    ]

    private shopItems: ShopItem[] = []

    constructor(name: string) {
        super(name)

        const defaultSkin = new ShopItem('Default', this.skins[0])
        defaultSkin.transform.globalPosition = new Vector(0, 175)
        this.shopItems.push(defaultSkin)
        this.addChild(defaultSkin)
        defaultSkin.purchase()

        const angrySkin = new ShopItem('Angry', this.skins[1])
        angrySkin.transform.globalPosition = new Vector(-100, 25)
        this.shopItems.push(angrySkin)
        this.addChild(angrySkin)

        const pinkySkin = new ShopItem('Pinky', this.skins[2])
        pinkySkin.transform.globalPosition = new Vector(100, 25)
        this.shopItems.push(pinkySkin)
        this.addChild(pinkySkin)

        const roundySkin = new ShopItem('Roundy', this.skins[3])
        roundySkin.transform.globalPosition = new Vector(-100, -125)
        this.shopItems.push(roundySkin)
        this.addChild(roundySkin)

        const zombieSkin = new ShopItem('Zombie', this.skins[4])
        zombieSkin.transform.globalPosition = new Vector(100, -125)
        this.shopItems.push(zombieSkin)
        this.addChild(zombieSkin)

        this.shopItems.forEach((item) => (item.isActive = item.isVisible = false))
        
        BirdGame.currentSkin = this.skins[0]

        const shopButton = new ShopButton('Shop Button')
        shopButton.start()

        const candyCounter = new CandyCounter('Candy Counter')
        candyCounter.start()
        candyCounter.setParent(this)

        const backButton = new ButtonNode(
            'Back Button',
            new NineSlice(NineSliceType.BUTTON_IDLE),
            new NineSlice(NineSliceType.BUTTON_IDLE)
        )
        backButton.button.clicked.subscribe(() =>
            BirdGame.stateMachine.changeState(GameState.WELCOME)
        )
        backButton.setButtonSize(new Vector(70, 32))
        backButton.textContent.font = "20px verdana"
        backButton.textContent.text = "Back"
        backButton.transform.globalPosition = new Vector(-160, 200)
        backButton.start()
        backButton.isVisible = false

        BirdGame.stateMachine.configure(GameState.SHOP).onEntry(this.getGuid(), () => {
            this.shopItems.forEach((item) => (item.isActive = item.isVisible = true))
            this.isVisible = true
            backButton.isVisible = true
        })

        BirdGame.stateMachine.configure(GameState.SHOP).onExit(this.getGuid(), () => {
            this.shopItems.forEach((item) => (item.isActive = item.isVisible = false))
            this.isVisible = false
            backButton.isVisible = false
        })
        
        BirdGame.stateMachine.configure(GameState.WELCOME).onEntry(this.getGuid(), () => {
            shopButton.isVisible = true
        })

        BirdGame.stateMachine.configure(GameState.WELCOME).onExit(this.getGuid(), () => {
            shopButton.isVisible = false
        })
    }
}

export default Shop
