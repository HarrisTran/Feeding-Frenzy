import { _decorator, log } from "cc";
import { ConditionState } from "../../ConditionState";
import { ActionContents } from "../../FishContent/ActionContents";
import { ActionIO } from "../../FishContent/ActionIO";

const {ccclass, property} = _decorator
@ccclass('ConditionChase')
export class ConditionChase extends ConditionState
{
    protected actionIO : ActionIO
    constructor(content : ActionContents)
    {
        super(content)
        this.actionIO = this.contents as ActionIO
    }
    public isAbleEnter() : boolean
    {
        return this.actionIO.chaseContent.chaseFish != null
    }

    public isAbleExit(): boolean {
        return this.actionIO.chaseContent.chaseFish == null || this.actionIO.chaseContent.chaseCountDown <=0
    }
}