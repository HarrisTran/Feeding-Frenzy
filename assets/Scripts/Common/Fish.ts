import { _decorator, Animation, BoxCollider2D, Collider2D, Component, sp, log, Node, PhysicsSystem, PolygonCollider2D, Skeleton, Sprite, tween, v3, Vec2, Vec3, CCFloat, CCInteger, Enum, Details } from 'cc';
import { FishSettings } from '../Setting/GameSetting';
import { ActionContents } from '../FishAI/FishContent/ActionContents';
import { PoolFish } from '../FishManager/PoolControl/PoolFish';
import { FishNameScore } from '../FishAI/FishContent/FishNameScore';
import { FishType } from '../Unit/FishType';
import { Summon } from '../FishAI/Summon/Summon';
import { REWARD, Reward } from '../FishAI/FishContent/ActionData';
const { ccclass, property } = _decorator;

Enum(FishType)
@ccclass('Fish')
export class Fish extends Component {
    @property({type : FishType}) type : FishType
    private pool: PoolFish
    @property(Node)
    public mouthPoint: Node = null;

    @property(FishNameScore)
    public fishNameScore : FishNameScore = null


    @property(ActionContents) action : ActionContents
    @property(CCInteger)
    exp : number;
    @property(CCFloat) IndividualExp: number = -1
    @property(sp.Skeleton) anim : sp.Skeleton = null
    reward : Reward

    public summon : Summon = new Summon()
    
    private currentSize = 1

    public setup(poolFish : PoolFish) : void
    {
        this.pool = poolFish
        this.node.active = true;
        this.action?.loadSetting(this)
        this.fishNameScore?.initFish(this)
        this.exp = REWARD.get(this.type).exp
        this.summon.initFish(this)
        this.updateSize()
    }

    public gainIndiviualExp(value : number)
    {
        this.IndividualExp += value
    }

    public gameTick(deltaTime: number)
    {
        this.action?.onActionUpdate(deltaTime)
        this.fishNameScore?.gameStick(deltaTime)
    }

    public wasEte()
    {
        this.currentSize = 1

        this.summon.respawn()
        this.action?.resetAction()
        this.fishNameScore?.resetFish()
        this.updateSize()
    }

    protected onDestroy(): void {
    }
    
    updateSize()
    {
        if(this.type === FishType.FISHIO)
        {
            var value = this.exp >= 75 ? 0.75 : this.exp*0.01
            this.node.setScale(this.currentSize+value,this.currentSize+value)
            log("hello "+value)
        }
        
    }
}

