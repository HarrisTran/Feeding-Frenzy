import { _decorator } from "cc";
import { Fish } from "../../../Common/Fish";
import { PoolFish } from "../../../FishManager/PoolControl/PoolFish";
import { SummonOnlyBottom } from "../../Summon/SummonOnlyBottom";

const {ccclass,property} =_decorator
@ccclass('FishJelly')
export class FishJelly extends Fish
{
    private jellySummon = new SummonOnlyBottom()
    public setup(poolFish: PoolFish) {
        super.setup(poolFish)
        this.summon = new SummonOnlyBottom()
        this.summon.initFish(this)
    }
}