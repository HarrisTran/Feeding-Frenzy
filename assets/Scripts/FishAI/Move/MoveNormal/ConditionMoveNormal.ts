import { _decorator } from "cc";
import { ConditionState } from "../../ConditionState";
import { ActionContents } from "../../FishContent/ActionContents";

const {ccclass, property} = _decorator
@ccclass('ConditionMoveNormal')
export class ConditionMoveNormal extends ConditionState
{
    constructor(contents : ActionContents)
    {
        super(contents)
    }

    public isAbleEnter(): boolean {
        return true
    }
    
    public isAbleExit(): boolean {
        return false
    }
}