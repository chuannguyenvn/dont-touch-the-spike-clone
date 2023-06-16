import SkinData from './SkinData'
import Resource from '../../engine/system/Resource'
import SpriteType from '../../engine/configs-and-resources/SpriteTypes'
import Color from '../../engine/math/Color'
import Node from '../../engine/node/Node'
import ShopItem from './ShopItem'
import Vector from '../../engine/math/Vector'
import GameState from '../GameState'
import BirdGame from '../BirdGame'

class Shop extends Node {
    private skins: SkinData[] = [
        new SkinData(
            'Normie',
            Resource.getSprite(SpriteType.BIRD_DEFAULT_JUMP),
            Resource.getSprite(SpriteType.BIRD_DEFAULT_GLIDE),
            Color.fromHex('d62945'),
            0
        ),
        new SkinData(
            'Angry',
            Resource.getSprite(SpriteType.BIRD_ANGRY_JUMP),
            Resource.getSprite(SpriteType.BIRD_ANGRY_GLIDE),
            Color.fromHex('283756'),
            1
        ),
        new SkinData(
            'Pinky',
            Resource.getSprite(SpriteType.BIRD_PINKY_JUMP),
            Resource.getSprite(SpriteType.BIRD_PINKY_GLIDE),
            Color.fromHex('ee4496'),
            2
        ),
        new SkinData(
            'Roundy',
            Resource.getSprite(SpriteType.BIRD_ROUND_JUMP),
            Resource.getSprite(SpriteType.BIRD_ROUND_GLIDE),
            Color.fromHex('3b5ba9'),
            3
        ),
        new SkinData(
            'Zomby',
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
        defaultSkin.transform.globalPosition = new Vector(0, 100)
        this.shopItems.push(defaultSkin)

        const angrySkin = new ShopItem('Angry', this.skins[1])
        angrySkin.transform.globalPosition = new Vector(-100, 0)
        this.shopItems.push(angrySkin)

        const pinkySkin = new ShopItem('Pinky', this.skins[2])
        pinkySkin.transform.globalPosition = new Vector(100, 0)
        this.shopItems.push(pinkySkin)

        const roundySkin = new ShopItem('Roundy', this.skins[3])
        roundySkin.transform.globalPosition = new Vector(-100, -100)
        this.shopItems.push(roundySkin)

        const zombieSkin = new ShopItem('Zombie', this.skins[4])
        zombieSkin.transform.globalPosition = new Vector(100, -100)
        this.shopItems.push(zombieSkin)

        this.shopItems.forEach((item) => (item.isActive = item.isVisible = false))

        BirdGame.stateMachine.configure(GameState.SHOP).onEntry(this.getGuid(), () => {
            this.shopItems.forEach((item) => (item.isActive = item.isVisible = true))
        })

        BirdGame.stateMachine.configure(GameState.SHOP).onExit(this.getGuid(), () => {
            this.shopItems.forEach((item) => (item.isActive = item.isVisible = false))
        })
    }
}

export default Shop
