import { _decorator } from "cc";
import { ActionOnState } from "../ActionOnState";

const {ccclass} =_decorator
@ccclass('ActionMove')
export class ActionMove extends ActionOnState
{
    onEnter(): void {
        this.contents.safeFish.anim.addAnimation(0,"idle",true)
    }
    onExit(): void {
        
    }
}