import { Vec2, _decorator, game, log, Node, Vec3 } from "cc";
import { ActionOnState } from "../../ActionOnState";
import { ActionIO } from "../../FishContent/ActionIO";
import { ActionContents } from "../../FishContent/ActionContents";
import { BackGround } from "../../../Common/BackGround";

const {ccclass} = _decorator
@ccclass('ActionEscapeOnTurn')
export class ActionEscapeOnTurn extends ActionOnState
{
    direction = Vec2.ZERO
    private actionIO : ActionIO
    constructor(contents : ActionContents)
    {
        super(contents)
        this.actionIO = this.contents as ActionIO
    }

    onEnter(): void {
        this.contents.escapeContents.escapeCountDown = 2
        //this.direction = new Vec2(this.getX(), this.getY()).normalize()

        var x = -this.actionIO.escapeContents.escapeFish.node.worldPosition.x+this.actionIO.node.worldPosition.x
        var y = -this.actionIO.escapeContents.escapeFish.node.worldPosition.y+this.actionIO.node.worldPosition.x
        this.direction = new Vec2(-y, x).normalize()
        // log(this.direction)
    }

    onUpdate(): void {
        var posSafe = this.actionIO.node.worldPosition
        this.contents.escapeContents.escapeCountDown -= game.deltaTime
        var nextPos = this.nextPos(this.contents.escapeContents.speedEscape*1.5)
        this.contents.node.setWorldPosition(posSafe.x+nextPos.x,posSafe.y+nextPos.y, posSafe.z)
    }
    getX()
    {
        var xE= this.actionIO.escapeContents.escapeFish.node.worldPosition.x
        var selfX = this.actionIO.node.worldPosition.x
        return xE - selfX
    }
    getY(angle : number)
    {
        return Math.tan(angle)*this.getX()
    }
    nextPos(speed : number)
    {
        var x = this.direction.x*speed*game.deltaTime
        var y = this.direction.y*speed*game.deltaTime
        return {x,y}
    }

    sup()
    {
        var a = this.actionIO.escapeContents.escapeFish.node.worldPosition.clone()
        return a.subtract(this.actionIO.node.worldPosition)
    }
}