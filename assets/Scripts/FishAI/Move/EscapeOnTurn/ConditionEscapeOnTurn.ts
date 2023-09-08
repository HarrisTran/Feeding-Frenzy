import { _decorator } from "cc";
import { ConditionState } from "../../ConditionState";
import { ActionIO } from "../../FishContent/ActionIO";
import { ActionContents } from "../../FishContent/ActionContents";
import { BackGround } from "../../../Common/BackGround";

const {ccclass} = _decorator
@ccclass('ConditionEscapeOnTurn')
export class ConditionEscapeOnTurn extends ConditionState
{
    protected actionIO : ActionIO
    constructor(content : ActionContents)
    {
        super(content)
        this.actionIO = this.contents as ActionIO
    }

    public isAbleEnter(): boolean {
        var result = this.contents.node.worldPosition.x >= BackGround.getInstance().node.worldPosition.x+1900
        result ||= this.contents.node.worldPosition.x <= BackGround.getInstance().node.worldPosition.x-1900
        return this.contents.escapeContents.escapeFish != null && result
    }
    public isAbleExit(): boolean {
        var result = this.contents.node.worldPosition.x <= BackGround.getInstance().node.worldPosition.x+1500
        result &&= this.contents.node.worldPosition.x >= BackGround.getInstance().node.worldPosition.x-1500
        return result || (this.contents.escapeContents.escapeFish == null || this.contents.escapeContents.escapeCountDown <=0)
        
    }
}