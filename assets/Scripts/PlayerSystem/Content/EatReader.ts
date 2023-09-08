import {  Collider2D, Component, Contact2DType, _decorator, instantiate,Node, log, sp, Tween, tween, Vec3 } from "cc"; 
import { Fish } from "../../Common/Fish";
import { Game } from "../../Game";
import { RankManager } from "../../FishManager/RankManager";
import { MainGameManager } from "../../Game/Manager/MainGameManager";
import { SoundName } from "../../../Services/AudioSystem/Sound/SoundConfig";
import { GameUI } from "../../Game/GameUI";
import { PopupType } from "../../../Services/PopupSystem/PopupType";
import { ResultManager } from "../../Common/ResultManager";

const {ccclass, property} = _decorator
@ccclass
export class EatReader extends Component
{
    public OnEats : IOnEat[] = []
    public OnEatFails : IOnEatFail[] = []
    @property(Node) blood :Node


    selfFish : Fish
    @property(Collider2D) eatHitBox : Collider2D;

    //@property(PopupBase) losePopup: PopupBase;

    protected onLoad(): void {
        this.selfFish = this.getComponent(Fish)

        this.eatHitBox.on(Contact2DType.BEGIN_CONTACT,this.onEat,this)
    }

    private onEat(_selfCollider: Collider2D, otherCollider: Collider2D) {
        let otherFishComp = otherCollider.getComponent(Fish)
        if (otherFishComp) {
            log("Trigger Eat")
            if(this.selfFish.IndividualExp > otherFishComp.IndividualExp)
            {
                this.OnEats.forEach(element => {
                    element.onEat(otherFishComp);
                });
                this.eatAnim(otherFishComp).start()
                this.spawnBloodVFX()
                GameUI.instance.updateProgressBar()
            }
        }
    }

    onEatFail(fish : Fish)
    {
        this.OnEatFails.forEach(element => {element.onEatFail();});
        this.node.active = false

        ResultManager.instance.currentKill = GameUI.instance.getFishCount()
        ResultManager.instance.currentRank = RankManager.getInstance().getRankPlayer()
        Game.getInstance().pauseGame()
    }
    protected onDestroy(): void {
        this.eatHitBox.off(Contact2DType.BEGIN_CONTACT,this.onEat,this)
        this.OnEats = []
    }

    private eatAnim(fishIsEat : Fish) : Tween<Node>
    {
        const preScale = fishIsEat.node.getScale();
        var safe = this.getComponent(Fish)
        return tween(fishIsEat.node)
        .parallel(
            tween(fishIsEat.node).to(0.2,{scale: Vec3.ZERO}),
            tween(fishIsEat.node).to(0.2,{worldPosition: safe.mouthPoint.getWorldPosition()})
        ).
        to(0, {}, {
            onComplete: () => {
                fishIsEat.wasEte()
                fishIsEat.node.setScale(preScale);
                this.onAte(fishIsEat)
            }
        })
    }
    
    private spawnBloodVFX()
    {
        this.scheduleOnce(()=> {
            MainGameManager.instance.audioManager.soundControl.playSound(SoundName.EAT)
            const x = instantiate(this.blood)
            x.active = true
            x.parent = this.node
            x.setWorldPosition(this.blood.worldPosition)
            x.getComponent(sp.Skeleton).addAnimation(0,"bloodvfx",false)
            x.getComponent(sp.Skeleton).setCompleteListener(() => x.destroy())
        },0.3)
    }

    onAte(fish : Fish)
    {
        this.selfFish.fishNameScore?.addScore(fish.exp)
        this.selfFish.exp += fish.exp
        this.selfFish.IndividualExp = this.selfFish.exp
        RankManager.getInstance().balance()
        RankManager.getInstance().sortRank()
    }
}

export interface IOnEat
{
    onEat(eatAble ? : Fish) : void;
}

export interface IOnEatFail
{
    onEatFail() : void;
}