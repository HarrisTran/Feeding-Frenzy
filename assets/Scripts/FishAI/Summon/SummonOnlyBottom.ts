import { Vec3, _decorator, log, randomRange, randomRangeInt } from "cc";
import { Summon } from "./Summon";
import { Fish } from "../../Common/Fish";
import { BackGround } from "../../Common/BackGround";

const {ccclass,property}=_decorator
@ccclass('SummonOnlyBottom')
export class SummonOnlyBottom extends Summon
{
    initFish(fish: Fish): void {
        super.initFish(fish)
    }
    public respawn() {
        var pos=  this.getPos()
        this.safeFish.node.setPosition(new Vec3(pos.x,pos.y,0))
    
    }

    getPos()
    {
        var BgPosition = BackGround.getInstance().node.position
        var y =BgPosition.y - randomRange(2000,2100)
        var x = this.randomByStep(50,-1900,1900)
        return {x,y}
    }

    randomByStep(step : number, a : number, b : number)
    {
        var start = a+ randomRange(0,step)
        var end = b
        var list : Array<number> = new Array<number>()
        while(start < end)
        {
            list.push(start)
            start += step
        }

        return list[randomRangeInt(0,list.length-1)]
    }

}