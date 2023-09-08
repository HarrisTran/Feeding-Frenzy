import { Vec3, _decorator, game, log } from "cc";
import { ActionOnState } from "../../ActionOnState";
import { ActionContents } from "../../FishContent/ActionContents";
import { BackGround } from "../../../Common/BackGround";
import { ActionIO } from "../../FishContent/ActionIO";

const {ccclass} =_decorator
@ccclass('ActionTurnVertical')
export class ActionTurnVertical extends ActionOnState
{
    private actionIO : ActionIO
    constructor(contents : ActionContents)
    {
        super(contents)
        this.actionIO = this.contents as ActionIO
    }

    private direction =1
    onEnter(): void {
        this.actionIO.escapeContents.escapeFish = null
        this.actionIO.chaseContent.chaseFish = null
        if(this.contents.node.worldPosition.y > BackGround.getInstance().node.worldPosition.y +1900)
        {
            this.direction = -1
        }
        if(this.contents.node.worldPosition.y < BackGround.getInstance().node.worldPosition.y -1900)
        {
            this.direction = 1
        }

    }

    onUpdate(): void {

        var newPosY = this.contents.node.worldPosition.y+ this.contents.speedMove*game.deltaTime*this.direction
        this.contents.node.setWorldPosition(this.contents.node.worldPosition.x,newPosY,this.contents.node.worldPosition.z)
    }

    onExit(): void {
    }
}