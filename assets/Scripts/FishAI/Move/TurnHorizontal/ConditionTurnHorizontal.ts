import { _decorator, log } from "cc";
import { ActionContents } from "../../FishContent/ActionContents";
import { ConditionState } from "../../ConditionState";
import { BackGround } from "../../../Common/BackGround";


const {ccclass, property} =_decorator
@ccclass('ConditionTurnHorizontal')

export class ConditionTurnHorizontal extends ConditionState
{   
    constructor(content : ActionContents)
    {
        super(content)
    }
    public isAbleEnter() : boolean
    {
        var result = this.contents.node.worldPosition.x >= BackGround.getInstance().node.worldPosition.x+1900
        result ||= this.contents.node.worldPosition.x <= BackGround.getInstance().node.worldPosition.x-1900
        return result
    }
    
    public isAbleExit(): boolean {
        var result = this.contents.node.worldPosition.x <= BackGround.getInstance().node.worldPosition.x+1700
        result &&= this.contents.node.worldPosition.x >= BackGround.getInstance().node.worldPosition.x-1700
        return result
    }
}