import { _decorator } from "cc";
import { State } from "../State";
import { ActionContents } from "../FishContent/ActionContents";
import { ConditionState } from "../ConditionState";


const {ccclass,property} =_decorator
@ccclass('StateControl')
export class StateControl 
{

    currentState : State = null
    protected rootState : State
    loadContent(contents : ActionContents)
    {
        this.rootState = new State("Root",this,new ConditionState(contents),null)
        this.createState(contents)
    }
    
    start()
    {
        
    }
    createState(contents : ActionContents)
    {
    }

    switchState(nextSate : State)
    {
        nextSate?.onExit()
        this.currentState = nextSate
        this.currentState.onEnter()
    }
}