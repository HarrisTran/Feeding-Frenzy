import { _decorator, CCFloat, easing, log, Node, tween, Vec3 } from 'cc';
import { ItemAction } from './ItemAction';
const { ccclass, property } = _decorator;

@ccclass
export class ItemScaleAndMove extends ItemAction {


    @property(Vec3) startScale : Vec3 = null
    @property(Vec3) endScale : Vec3 = null

    @property(CCFloat) durationScale : number = 0
    @property(CCFloat) durationMove : number = 0
    
    public runAction()
    {
        this.item.node.active = true
        this.item.node.setScale(0,0,0)
        this.ScaleAndMove()
    }

    private ScaleAndMove()
    {
        tween(this.node)
        .to(this.durationScale, {scale : this.endScale}, {easing : 'backOut'})
        .delay(0.15)
        .to(this.durationMove,{
            scale : new Vec3(0.01,0.01,0.01),
        }, {easing : 'backOut' }).call(() => this.onEndAction())
        .start()
    }


    onEndAction()
    {
        this.node.active = false
        const item = this.pool.Items.shift()
        this.pool.ItemsInPools.push(item)
    }
}

