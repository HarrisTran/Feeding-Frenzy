import { Collider2D, _decorator, Node, Contact2DType, CCFloat, log } from "cc";
import { ActionContents } from "./ActionContents";
import { Fish } from "../../Common/Fish";
import { PlayerSingleton } from "../../PlayerSystem/PlayerSingleton";

const {ccclass,property} = _decorator
@ccclass("EatContents")
export class EatContents
{
    private actionContents : ActionContents
    @property(Collider2D) eatSeeker : Collider2D = null
    @property(Node) blood : Node
    timeEat : number = 0.5
    fishForEat : Fish

    loadContent(unitContent : ActionContents)
    {
        this.actionContents = unitContent
        this.eatSeeker.on(Contact2DType.BEGIN_CONTACT,this.onTriggerTarget,this)
        this.eatSeeker.on(Contact2DType.END_CONTACT,this.onExitEatTarget,this)
    }

    private onTriggerTarget(safe : Collider2D, other : Collider2D)
    {
        const fish = other.getComponent(Fish)
        if(!fish) return
        if(fish.node === PlayerSingleton.getInstance().contents.node)
        {
            log(this + " player")
        }
        if(fish.IndividualExp < this.actionContents.safeFish.IndividualExp)
        {
            this.fishForEat = fish
        }
    }
    private onExitEatTarget(safe : Collider2D, other : Collider2D)
    {
        if(!this.fishForEat ) return
        if(other.node == this.fishForEat.node)
        {
            this.fishForEat = null
        }
    }

    onDestroy()
    {
        this.eatSeeker.off(Contact2DType.BEGIN_CONTACT,this.onTriggerTarget,this)
        this.eatSeeker.off(Contact2DType.END_CONTACT,this.onExitEatTarget,this)
    }

}