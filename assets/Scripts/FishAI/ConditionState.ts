import { _decorator } from "cc";
import { ActionContents } from "./FishContent/ActionContents";

const {ccclass, property} =_decorator
@ccclass('ConditionState')

export class ConditionState
{
    protected contents : ActionContents
    
    constructor(content : ActionContents)
    {
        this.contents = content
    }
    public isAbleEnter() : boolean
    {
        return true
    }
    public isAbleExit() : boolean
    {
        return false
    }
}