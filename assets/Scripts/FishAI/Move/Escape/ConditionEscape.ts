import { _decorator } from "cc";
import { ActionContents } from "../../FishContent/ActionContents";
import { ConditionState } from "../../ConditionState";


const {ccclass, property} =_decorator
@ccclass('ConditionEscape')

export class ConditionEscape extends ConditionState
{   
    constructor(contents : ActionContents)
    {
        super(contents)
    }

    public isAbleEnter(): boolean {
        return this.contents.escapeContents.escapeFish != null
    }

    public isAbleExit() : boolean
    {
        return this.contents.escapeContents.escapeFish == null && this.contents.escapeContents.escapeCountDown <=0
    }

}