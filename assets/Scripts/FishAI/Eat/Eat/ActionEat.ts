import { _decorator, director, game, instantiate, log,Node, RichText, sp, tween, Tween, Vec3 } from "cc";
import { ActionOnState } from "../../ActionOnState";
import { ActionContents } from "../../FishContent/ActionContents";
import { Fish } from "../../../Common/Fish";
import { PlayerSingleton } from "../../../PlayerSystem/PlayerSingleton";
import { ActionIO } from "../../FishContent/ActionIO";
import { MainGameManager } from "../../../Game/Manager/MainGameManager";
import { PopupType } from "../../../../Services/PopupSystem/PopupType";
import { SoundName } from "../../../../Services/AudioSystem/Sound/SoundConfig";
import { CameraManager } from "../../../Game/Manager/CameraManager";

const {ccclass} =_decorator
@ccclass('ActionEat')
export class ActionEat extends ActionOnState
{
    private actionIO : ActionIO
    

    constructor(contents : ActionContents)
    {
        super(contents)
        var convert = function(contents) {
            return contents as ActionIO
        }
        this.actionIO = convert(contents)
    }

    onEnter(): void {
        this.contents.safeFish.anim.addAnimation(0,"attack",false)
        this.contents.safeFish.anim.setCompleteListener(()=> this.actionIO.eatContent.timeEat = -1)
        this.actionIO.eatContent.timeEat = 0.3
        
        if(this.actionIO.eatContent.fishForEat.node == PlayerSingleton.getInstance().contents.node)
        {
            PlayerSingleton.getInstance().contents.eatReader.onEatFail(this.actionIO.safeFish)
this.contents.scheduleOnce(() => MainGameManager.instance.popupManager.showPopup(PopupType.LOSE),1)
        }
        else
        {
            this.spawnBloodVFX()
            this.eatAnim(this.actionIO.eatContent.fishForEat).start()
        }
    }    
    onExit(): void {

        this.contents.safeFish.anim.addAnimation(0,"idle",true)
    }

    private spawnBloodVFX()
    {
        var posCam = CameraManager.getInstance().node.position
        this.actionIO.scheduleOnce(()=> {
            const x = instantiate(this.actionIO.eatContent.blood)
            x.active = true
            x.parent = this.actionIO.node
            x.setWorldPosition(this.actionIO.eatContent.blood.worldPosition)
            x.getComponent(sp.Skeleton).addAnimation(0,"bloodvfx",false)
            x.getComponent(sp.Skeleton).setCompleteListener(() => x.destroy())
        },0.2)
    }

    private eatAnim(fishIsEat : Fish) : Tween<Node>
    {
        const preScale = fishIsEat.node.getScale();
        var safe = this.actionIO.safeFish
        return tween(fishIsEat.node)
        .parallel(
            tween(fishIsEat.node).to(0.1,{scale: Vec3.ZERO}),
            tween(fishIsEat.node).to(0.1,{worldPosition: safe.mouthPoint.getWorldPosition()})
        ).
        to(0, {}, {
            onComplete: () => {
                this.onAte(fishIsEat)
                this.actionIO.eatContent.fishForEat = null
            }
        })
    }

    onAte(fish : Fish)
    {
        this.actionIO.safeFish.fishNameScore.addScore(fish.exp)
        this.actionIO.safeFish.exp += fish.exp
        this.actionIO.safeFish.IndividualExp = this.actionIO.safeFish.exp
        this.actionIO.safeFish.updateSize()
        fish.wasEte()
    }
}