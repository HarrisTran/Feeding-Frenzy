import { _decorator } from "cc";
import { ActionContents } from "../../FishContent/ActionContents";
import { ConditionState } from "../../ConditionState";
import { BackGround } from "../../../Common/BackGround";


const {ccclass, property} =_decorator
@ccclass('ConditionTurnVertical')

export class ConditionTurnVertical extends ConditionState
{   
    constructor(content : ActionContents)
    {
        super(content)
    }
    public isAbleEnter() : boolean
    {
        var result = this.contents.node.worldPosition.y >= BackGround.getInstance().node.worldPosition.y+1900
        result ||= this.contents.node.worldPosition.y <= BackGround.getInstance().node.worldPosition.y-1900
        return result
    }
    
    public isAbleExit(): boolean {
        var result = this.contents.node.worldPosition.y <= BackGround.getInstance().node.worldPosition.y+1800 && this.contents.node.worldPosition.y >= BackGround.getInstance().node.worldPosition.y-1800
        return result
    }
}