import { Vec3, _decorator, game, log, randomRange } from "cc";
import { ActionOnState } from "../../ActionOnState";
import { ActionContents } from "../../FishContent/ActionContents";
import { random } from "../../../Common/Utils";
import { ActionIO } from "../../FishContent/ActionIO";

const {ccclass} =_decorator
@ccclass('ActionTurn')
export class ActionTurn extends ActionOnState
{
    private actionIO : ActionIO
    constructor(contents : ActionContents)
    {
        super(contents)
        this.actionIO = this.contents as ActionIO
    }

    randomX = 0
    randomY = 0
    onEnter(): void {
        this.actionIO.escapeContents.escapeFish = null
        this.actionIO.chaseContent.chaseFish = null
        var direction = this.actionIO.node.eulerAngles.y
        var newDirection = function() { 
            if(direction == 0) return 180
            if(direction == 180) return 0
            return 0
        }
        this.contents.node.eulerAngles = new Vec3(0,newDirection())
        let angle = this.getAngle()
        var speed = this.contents.speedMove
        this.randomX = Math.cos(angle)*speed*game.deltaTime*(this.contents.node.eulerAngles.y == 180 ? 1: -1)
        this.randomY = Math.sin(angle)*speed*game.deltaTime
    }

    onUpdate(): void {

        this.contents.node.setWorldPosition(this.contents.node.worldPosition.x+ this.randomX,this.contents.node.worldPosition.y+this.randomY,this.contents.node.worldPosition.z)
    }
    
    getAngle()
    {
        return randomRange(0,1) < 0.5 ? randomRange(-Math.PI/3,-Math.PI/6) : randomRange(Math.PI/6,Math.PI/3)
    }
}