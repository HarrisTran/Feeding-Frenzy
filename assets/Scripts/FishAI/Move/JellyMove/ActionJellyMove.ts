import { Vec3, _decorator, game, log } from "cc";
import { ActionOnState } from "../../ActionOnState";
import { ActionContents } from "../../FishContent/ActionContents";
import { ActionJelly } from "../../FishContent/Fish_Jelly/ActionJelly";

const {ccclass,property} = _decorator
@ccclass('ActionJellyMove')
export class ActionJellyMove extends ActionOnState
{
    index = 0
    time = 0
    randomX = 0
    randomY = 0
    private jellyContent : ActionJelly
    constructor(contents : ActionContents)
    {
        super(contents)
        this.jellyContent = this.contents as ActionJelly
    }
    onEnter(): void {

    }

    onExit(): void {
        
    }

    onUpdate(): void {
        if(this.index == 0 && this.time <0)
        {
            this.randomX = 0
            this.randomY = 120*game.deltaTime
            this.time = this.contents.timeMove.random()
            this.index = 1
        } else if(this.index == 1 && this.time <0)
        {
            this.randomX = 0
            this.randomY = 0
            this.time = this.contents.timeIdle.random()
            this.index = 0
        }
        this.time -= game.deltaTime
        var old = this.jellyContent.node.worldPosition
        var newPos = old.add(new Vec3(0,this.randomY,0))
        this.jellyContent.node.setWorldPosition(newPos)

    }
}