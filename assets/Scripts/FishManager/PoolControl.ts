import { Component, _decorator, log } from "cc";
import { PoolFish } from "./PoolControl/PoolFish";
import { FishType } from "../Unit/FishType";
import { FishManager } from "../Game/Manager/FishManager";
import { FishSettings } from "../Setting/GameSetting";

const {ccclass,property} =_decorator
@ccclass('PoolControl')
export class PoolControl extends Component
{
    @property(PoolFish) poolFishs : PoolFish[] = []
    
    public loadFishManager(fishManager : FishManager,fishSetting : FishSettings[])
    {
        this.poolFishs.forEach((pool) => pool.loadPoolControl(this))
    }
}