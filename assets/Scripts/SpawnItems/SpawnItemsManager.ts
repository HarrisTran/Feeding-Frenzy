import { Component, _decorator, log } from "cc";
import { PoolItems } from "./PoolItems";
import { Item } from "./Item";
import { ItemAction } from "./ItemAction";

const {ccclass, property} = _decorator
@ccclass
export class SpawnItemsManager extends Component
{
    @property(PoolItems) Pools: PoolItems[] = []
    @property(Item) ItemPrefabs : Item[] = []

    protected onLoad(): void {
        this.initItemForPool()
    }

    initItemForPool()
    {
        this.ItemPrefabs.forEach(item => {
            var pool =this.Pools.find(x => x.Type == item.Type)
            var itemAction = item.getComponent(ItemAction)
            itemAction.setPool(pool)
        })
    }
}