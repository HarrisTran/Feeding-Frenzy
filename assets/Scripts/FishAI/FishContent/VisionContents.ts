import { CCFloat, Collider2D, Contact2DType, _decorator, log } from "cc";
import { Fish } from "../../Common/Fish";
import { ActionContents } from "./ActionContents";

const {ccclass,property} =_decorator

@ccclass("VisionContents")
export class VisionContents
{
    private actionContents : ActionContents
    @property(Collider2D) visionSeeker : Collider2D =null
    @property(CCFloat) timeMaxChase = 1
    chaseCountDown = 0
    speedChase = 0
    @property(CCFloat) timMaxEscape = 1
    escapeCountDown = 0
    speedEscape = 0

    chaseFish : Fish
    escapeFish : Fish
    
    initContents(contents : ActionContents)
    {
        this.actionContents = contents
        this.visionSeeker.on(Contact2DType.BEGIN_CONTACT,this.onEnterTrigger,this)
        this.visionSeeker.on(Contact2DType.END_CONTACT,this.onExitTrigger,this)
    }

    private onEnterTrigger(safe : Collider2D, other : Collider2D )
    {
        //if(other.group != 2) return
        const fishTrigger = other.getComponent(Fish)
        if(!fishTrigger || fishTrigger == this.actionContents.safeFish) return

        if(this.actionContents.safeFish.IndividualExp > fishTrigger.IndividualExp)
        {
            this.chaseFish = fishTrigger
        }

        if(this.actionContents.safeFish.IndividualExp < fishTrigger.IndividualExp)
        {
            this.escapeFish = fishTrigger

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
        if(this.escapeFish)
        if(other.node == this.escapeFish.node)
        {
            this.escapeFish = null
        }
    }

    onDestroy()
    {
        this.visionSeeker.off(Contact2DType.BEGIN_CONTACT,this.onEnterTrigger,this)
        this.visionSeeker.off(Contact2DType.END_CONTACT,this.onExitTrigger,this)
    }

}
