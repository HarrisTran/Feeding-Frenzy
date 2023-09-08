import { _decorator, log } from "cc";
import { ConditionState } from "../../ConditionState";
import { ActionContents } from "../../FishContent/ActionContents"
import { ActionIO } from "../../FishContent/ActionIO";

const {ccclass, property} = _decorator
@ccclass('ConditionEat')
export class ConditionEat extends ConditionState
{
    private actionIO : ActionIO
    constructor(content : ActionContents)
    {
        super(content)
        this.actionIO = this.contents as ActionIO
    }
    public isAbleEnter() : boolean
    {
        return this.actionIO.eatContent.fishForEat != null
    }

    public isAbleExit(): boolean {
        return this.actionIO.eatContent.fishForEat == null
    }
}