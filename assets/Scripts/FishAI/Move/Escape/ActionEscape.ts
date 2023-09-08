import { _decorator,Node, log, Vec3, game, director, v2, Vec2 } from "cc";
import { ActionOnState } from "../../ActionOnState";
import { ActionContents } from "../../FishContent/ActionContents";
import { Fish } from "../../../Common/Fish";

const {ccclass} =_decorator
@ccclass('ActionEscape')
export class ActionEscape extends ActionOnState
{

    private fishTarget : Fish
    private direction : Vec3
    constructor(contents : ActionContents)
    {
        super(contents)
    }

    onEnter(): void {
        this.fishTarget = this.contents.escapeContents.escapeFish
        this.contents.escapeContents.escapeCountDown = this.contents.escapeContents.timMaxEscape

        var posSafe = this.contents.node.worldPosition
        var posTarget = this.fishTarget.node.worldPosition
        this.direction = new Vec3(posSafe.x -posTarget.x,posSafe.y-posTarget.y).normalize()

        if(this.direction.x >=0)
        {
            this.contents.node.eulerAngles = new Vec3(0,180)
        }
        else this.contents.node.eulerAngles = new Vec3(0,0)
        
    }

    onUpdate(): void {
        this.contents.escapeContents.escapeCountDown -= game.deltaTime
        if(this.contents.escapeContents.escapeCountDown <=0)
        {
            this.contents.escapeContents.escapeFish = null
            return
        }
        var posSafe = this.contents.node.worldPosition
        var nextPos = this.nextPos(this.contents.escapeContents.speedEscape)
        this.contents.node.setWorldPosition(posSafe.x+nextPos.x,posSafe.y+nextPos.y, posSafe.z)
    }
        nextPos(speed : number)
    {
        var x = this.direction.x*speed*game.deltaTime
        var y = this.direction.y*speed*game.deltaTime
        return {x,y}
    }
}