import { CCFloat, Collider2D, Contact2DType, _decorator } from "cc";
import { Fish } from "../../Common/Fish";
import { ActionContents } from "./ActionContents";
import { FishType } from "../../Unit/FishType";
import { SPEED_BASE } from "./ActionData";

const {ccclass,property} =_decorator
@ccclass('EscapeContents')
export class EscapeContents
{
    private actionContents : ActionContents
    @property(Collider2D) escapeSeeker : Collider2D
    timMaxEscape = 1
    escapeCountDown = 0
    speedEscape : number
    escapeFish : Fish


    loadContent(unitContent : ActionContents)
    {
        this.actionContents = unitContent
        this.speedEscape = SPEED_BASE.get(this.actionContents.safeFish.type).escape
        this.setTrigger(true)
    }

    private onBeginEscapeSeeker(safe : Collider2D, other : Collider2D)
    {
        const fishTrigger = other.getComponent(Fish) || other.node.parent.getComponent(Fish)
        if(!fishTrigger || fishTrigger == this.actionContents.safeFish) return


        if(this.actionContents.safeFish.IndividualExp < fishTrigger.IndividualExp)
        {
            this.escapeFish = fishTrigger
        }
        
    }

    private onEndEscapeSeeker(safe : Collider2D, other : Collider2D)
    {
        if(this.escapeFish)
        if(other.node == this.escapeFish.node)
        {
            this.escapeFish = null
        }
    }

    onDestroy()
    {
        this.setTrigger(false)
    }

    setTrigger(on : boolean)
    {
        if(on)
        {        this.escapeSeeker?.on(Contact2DType.BEGIN_CONTACT,this.onBeginEscapeSeeker,this)
            this.escapeSeeker?.on(Contact2DType.END_CONTACT,this.onEndEscapeSeeker,this)
        }
        else
        {
            this.escapeSeeker?.off(Contact2DType.BEGIN_CONTACT,this.onBeginEscapeSeeker,this)
            this.escapeSeeker?.off(Contact2DType.END_CONTACT,this.onEndEscapeSeeker,this)
        }
    }
    
    resetContent()
    {
        this.escapeFish = null
    }
}