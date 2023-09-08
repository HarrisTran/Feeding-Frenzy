
import { _decorator } from "cc";
import { ActionContents } from "./FishContent/ActionContents";

const {ccclass, property} =_decorator
@ccclass('ActionOnState')
export class ActionOnState
{
    protected contents : ActionContents
    constructor(contents : ActionContents)
    {
        this.contents = contents
    }
    onUpdate()
    {

    }

    onEnter()
    {

    }

    onExit()
    {
        
    }
}