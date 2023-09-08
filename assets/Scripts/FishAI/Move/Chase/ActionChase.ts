import { _decorator, director, game, log,Node, RichText, Vec2, Vec3 } from "cc";
import { ActionOnState } from "../../ActionOnState";
import { ActionContents } from "../../FishContent/ActionContents";
import { Fish } from "../../../Common/Fish";
import { ActionIO } from "../../FishContent/ActionIO";

const {ccclass} =_decorator
@ccclass('ActionChase')
export class ActionChase extends ActionOnState
{
    private fishTarget : Fish
    private direction : Vec3
    private speed : number
    private actionIO : ActionIO
    constructor(contents : ActionContents)
    {
        super(contents)
        this.actionIO = this.contents as ActionIO
    }

    onEnter(): void {
        this.actionIO.chaseContent.chaseCountDown = this.actionIO.chaseContent.timeMaxChase
        this.fishTarget = this.actionIO.chaseContent.chaseFish
        this.speed = this.actionIO.chaseContent.speedChase
    }

    onUpdate(): void {
        var posSafe = this.actionIO.node.worldPosition
        var posTarget = this.fishTarget.node.worldPosition
        this.actionIO.node.eulerAngles = new Vec3(0,posTarget.x -posSafe.x >=0 ? 180 : 0,0)
        this.actionIO.chaseContent.chaseCountDown -= game.deltaTime
        if(this.actionIO.chaseContent.chaseCountDown<=0)
        {
            this.actionIO.chaseContent.chaseFish = null
        }

        this.direction = new Vec3(posTarget.x-posSafe.x, posTarget.y-posSafe.y,0).normalize()
        var totalSpeed = this.speed*game.deltaTime
        this.actionIO.node.setWorldPosition(posSafe.x+this.direction.x*totalSpeed, posSafe.y + this.direction.y*totalSpeed,posSafe.z)
    }
        nextPos(speed : number)
    {
        var x = this.direction.x*speed*game.deltaTime
        var y = this.direction.y*speed*game.deltaTime
        return {x,y}
    }
}