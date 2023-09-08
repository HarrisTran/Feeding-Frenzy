import { CCFloat, Collider2D, Contact2DType, _decorator, log } from "cc";
import { Fish } from "../../Common/Fish";
import { ActionContents } from "./ActionContents";
import { SPEED_CHASCE } from "./ActionData";
import { PlayerSingleton } from "../../PlayerSystem/PlayerSingleton";

const {ccclass,property} =_decorator
@ccclass('ChaseContents')
export class ChaseContents
{
    private actionContents : ActionContents
    @property(Collider2D) chaseSeeker : Collider2D
    speedChase : number = 0
    timeMaxChase = 1
    chaseCountDown = 0
    chaseFish : Fish

    loadContent(unitContent : ActionContents)
    {
        this.speedChase = SPEED_CHASCE.get(unitContent.safeFish.type)
        this.actionContents = unitContent
        this.setTrigger(true)
    }

    onDestroy()
    {
        this.setTrigger(false)
    }
    private onEnterTrigger(safe : Collider2D, other : Collider2D)
    {
        const fishTrigger = other.getComponent(Fish)
        // if(fishTrigger && PlayerSingleton.getInstance().contents.node == fishTrigger.node)
        // {
        //     if(this.actionContents.safeFish.IndividualExp > fishTrigger.IndividualExp)
        //     {
        //         this.chaseFish = fishTrigger
        //         return
        //     }
        // } 
        if(!fishTrigger || fishTrigger == this.actionContents.safeFish) return

        if(this.actionContents.safeFish.IndividualExp > fishTrigger.IndividualExp)
        {
            this.chaseFish = fishTrigger
        }

    }

    private onExitTrigger(safe : Collider2D, other : Collider2D)
    {
        if(other.group != 2) return
        if(this.chaseFish)
        if(other.node == this.chaseFish.node)
        {
            this.chaseFish = null
        }
    }

    setData()
    {
        this.speedChase = SPEED_CHASCE.get(this.actionContents.safeFish.type)
    }

    private setTrigger(on : boolean)
    {
        if(on)
        {
            this.chaseSeeker.on(Contact2DType.BEGIN_CONTACT,this.onEnterTrigger,this)
            this.chaseSeeker.on(Contact2DType.END_CONTACT,this.onExitTrigger,this)
        }
        else
        {
            this.chaseSeeker.off(Contact2DType.BEGIN_CONTACT,this.onEnterTrigger,this)
            this.chaseSeeker.off(Contact2DType.END_CONTACT,this.onExitTrigger,this)
        }
    }

    resetContent()
    {
        this.chaseFish = null
    }
}