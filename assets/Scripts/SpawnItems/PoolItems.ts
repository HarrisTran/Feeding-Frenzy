import { Component, Enum, _decorator,Node, instantiate, log, Vec3, Camera } from "cc";
import { ItemType } from "./ItemType";
import { Item } from "./Item";
import { ItemAction } from "./ItemAction";
import { PlayerSingleton } from "../PlayerSystem/PlayerSingleton";
import { IOnEat } from "../PlayerSystem/Content/EatReader";
import { EatAble } from "../EatAble/EatAble";

const {ccclass, property} = _decorator
Enum(ItemType)
@ccclass
export class PoolItems extends Component implements IOnEat
{
    @property({type : ItemType}) Type : ItemType
    @property(Node) PoolStore : Node
    @property(Item) Items : Item[] = []
    @property(Item) ItemsInPools : Item[] = []

    @property(Node) ItemPrefab : Node

    protected start(): void {
        PlayerSingleton.getInstance().contents.eatReader.OnEats.push(this)
        
    }

    spawn(num: number,position ? : Vec3)
    {
        while(num >0)
        {
            if(this.ItemsInPools.length ==0) break
            num--

            var itemsInPool  = this.ItemsInPools.shift()
            itemsInPool.node.setWorldPosition(position)

            this.Items.push(itemsInPool)
            itemsInPool.getComponent(ItemAction).runAction()

        }
        if(num <=0) return

        while(num > 0)
        {
            var item = instantiate(this.ItemPrefab)
            item.parent = this.PoolStore
            item.setWorldPosition(position)
            this.Items.push(item.getComponent(Item))
            item.getComponent(ItemAction).runAction()
            num--
        }
    }

    onEat(eatAble ? : EatAble): void {
        if(!eatAble) return
        this.spawn(1,eatAble.node.worldPosition)
    }
}
