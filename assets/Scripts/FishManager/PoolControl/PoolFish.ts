import { Component, Enum, Prefab,Node, _decorator, CCInteger, instantiate, log, Vec3, repeat, randomRange, Camera, randomRangeInt, CCBoolean } from "cc";
import { PoolControl } from "../PoolControl";
import { Fish } from "../../Common/Fish";
import { FishSettings } from "../../Setting/GameSetting";
const {ccclass,property} =_decorator
@ccclass('PoolFish')
export class PoolFish extends Component
{
    @property(PoolControl) poolControl : PoolControl
    @property(Node) pool : Node
    @property(CCInteger) maxFishOnField : number = 7
    @property(Node) posSpawnStartGame : Node[] = []
    @property(Prefab) fish : Prefab[] = [];
    private fishInFields: Fish[] = [];
    fishSetting : FishSettings
    
    private index = 0

    public loadPoolControl(poolControl : PoolControl)
    {
        this.poolControl = poolControl
        this.spawnOnload()
        this.spawnAfterLoad()

    }
    public gameStick(dt: number)
    {
        this.fishInFields.forEach((fish) => fish.gameTick(dt))
    }

    private spawnOnload()
    {
        this.index = randomRangeInt(0,this.fish.length-1)
        var maxPos = this.posSpawnStartGame.length
        for(var i =0; i< maxPos; i++)
        {
            const fishSpawn = this.spawnFishInstance()
            fishSpawn.node.setWorldPosition(this.posSpawnStartGame[i].worldPosition.x + randomRange(-250,250),this.posSpawnStartGame[i].worldPosition.y+randomRange(-250,250),this.posSpawnStartGame[i].worldPosition.z)
            fishSpawn.node.eulerAngles = new Vec3(0,randomRange(0,1) < 0.5 ? 180 : 0,0)
            this.fishInFields.push(fishSpawn)
        }
        //this.scheduleOnce(()=>this.spawnAfterLoad(),5)
        this.spawnAfterLoad()
    }

    public spawnAfterLoad()
    {
        for(var i = 0; i< this.maxFishOnField- this.posSpawnStartGame.length; i++)
        {
            this.scheduleOnce(() => {const fishSpawn = this.spawnFishInstance()
                fishSpawn.summon.respawn()
                this.fishInFields.push(fishSpawn)},0.2)
            // const fishSpawn = this.spawnFishInstance()
            // fishSpawn.summon.respawn()
            // this.fishInFields.push(fishSpawn)
        }
    }

    private spawnFishInstance()
    {
        const fishSpawner = instantiate(this.fish[this.index]).getComponent(Fish)
        fishSpawner.setup(this)
        fishSpawner.node.parent= this.pool
        this.index =( this.index >= this.fish.length-1) ? 0 : this.index +1
        return fishSpawner
    }
}