import { _decorator, Component, log, Node, Vec3 } from 'cc';
import { FishManagerSettings, FishSettings } from '../../Setting/GameSetting';
import { PoolControl } from '../../FishManager/PoolControl';
const { ccclass, property } = _decorator;

@ccclass('FishManager')
export class FishManager extends Component {
    @property(PoolControl) pool : PoolControl

    public init(settings: FishManagerSettings) : void
    {
        this.pool.loadFishManager(this,settings.fishes)
    }

    public gameTick(deltaTime: number)
    {
        this.pool.poolFishs.forEach(poolFish => poolFish.gameStick(deltaTime))
    }
}

