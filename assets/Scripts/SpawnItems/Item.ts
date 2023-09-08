import { _decorator, Component, Enum, ccenum, Node, Vec3 } from 'cc';
import { ItemType } from './ItemType';
import { FishType } from '../Unit/FishType';
const { ccclass, property } = _decorator;

Enum(ItemType)
@ccclass('Item')
export class Item extends Component {
    @property({type : ItemType}) public Type: ItemType = ItemType.SUSHI
}


