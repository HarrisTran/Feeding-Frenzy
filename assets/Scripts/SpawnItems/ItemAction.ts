import { _decorator, Component, log, Node, Vec3 } from 'cc';
import { PoolItems } from './PoolItems';
import { Item } from './Item';
const { ccclass, property } = _decorator;

@ccclass
export class ItemAction extends Component {
    @property(PoolItems) pool: PoolItems
    @property(Item) protected item : Item 
   
    public setPosition(pos : Vec3)
    {

    }

    public setPool(pool : PoolItems )
    {
        this.pool = pool
    }

    public runAction()
    {

    }

}

