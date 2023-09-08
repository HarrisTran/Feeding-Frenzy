import { _decorator } from 'cc';
import { Fish } from '../../Common/Fish';
import { PoolFish } from '../../FishManager/PoolControl/PoolFish';
import { Summon } from '../Summon/Summon';
const { ccclass, property } = _decorator;

@ccclass('FishIO')
export class FishIO extends Fish {
    

    public setup(poolFish: PoolFish): void {
        this.setup(poolFish)
        this.summon = new Summon()
        this.summon.initFish(this)
    }
}
