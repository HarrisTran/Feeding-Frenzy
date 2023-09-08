import { Quat, RichText, Vec3, _decorator, game, log, randomRange } from "cc";
import { ActionOnState } from "../../ActionOnState";
import { ActionContents } from "../../FishContent/ActionContents";
import { random } from "../../../Common/Utils";

const {ccclass} =_decorator
@ccclass('ActionMoveNormal')
export class ActionMoveNormal extends ActionOnState
{
    index = 0
    time =0;
    randomX = 0
    randomY = 0
    speedMove = this.contents.speedMove

    constructor(contents : ActionContents)
    {
        super(contents)
    }

    onEnter(): void {
        this.contents.escapeContents.escapeFish = null
        this.index = 0
        this.time = 0
    }

    onUpdate(): void {
        this.move()

        
    }
    move()
    {
        if(this.index == 0 && this.time <0)
        {
            this.randomX = this.contents.speedMove*game.deltaTime
            this.randomY = 0
            this.time = this.contents.timeMove.random()
            this.index = 1
        } else if(this.index == 1 && this.time <0)
        {
            this.randomX = 0
            this.randomY = 0
            this.time = this.contents.timeIdle.random()
            this.index = 2
        } else if(this.index == 2 && this.time <0)
        {
            let angle = this.getAngle()
            this.randomX = Math.cos(angle)*this.contents.speedMove*game.deltaTime
            this.randomY = Math.sin(angle)*this.contents.speedMove*game.deltaTime
            this.time = this.contents.timeMove.random()
            this.index = 3 
        } else if(this.index == 3 && this.time <0)
        {
            var direction = this.contents.node.eulerAngles.y
            var newDirection = function() { 
                if(direction == 0) return 180
                if(direction == 180) return 0
                return 0
            }
            this.contents.node.eulerAngles = new Vec3(0,newDirection())
            this.randomX = 0
            this.randomY = 0

            this.time = 0.05
            this.index = 0
        }

        this.time -= game.deltaTime
        this.contents.node.setWorldPosition(this.contents.node.worldPosition.x+ this.randomX*this.directionMove(),this.contents.node.worldPosition.y+this.randomY,0)
    }

    directionMove()
    {
        var direction = this.contents.node.eulerAngles.y
        if(direction == 180)
        {
            return 1
        }
        else return -1
    }
    getAngle()
    {
        return randomRange(0,1) < 0.5 ? randomRange(-Math.PI/3,-Math.PI/6) : randomRange(Math.PI/6,Math.PI/3)
    }
}