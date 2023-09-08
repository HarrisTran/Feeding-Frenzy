import { _decorator, log } from "cc";
import { ConditionState } from "./ConditionState";
import { ActionOnState } from "./ActionOnState";
import { StateControl } from "./StateControls/StateControl";

const {ccclass, property} =_decorator
@ccclass('State')
export class State
{
    priority = 0;
    parrentState : State = null
    child : State
    childStates : State[] = []
    condition : ConditionState
    actionState : ActionOnState
    stateControl : StateControl

    name : any

    constructor(name : any,stateControl : StateControl,isEnter: ConditionState, action : ActionOnState, priority = 0){
        this.priority = priority
        this.actionState = action
        this.condition = isEnter
        this.stateControl = stateControl
        this.name = name
    }

    addChildState(child : State)
    {
        child.addParrentState(this)
        this.childStates.push(child)
        this.childStates.sort(function(a, b) {
            if (a.priority < b.priority) return 1;
            if (a.priority > b.priority) return -1;
            return 0;
        });    
    }
    
    addParrentState(parent: State)
    {
        this.parrentState = parent
    }

    onUpdate()
    {
        this.actionState?.onUpdate()
        this.parrentState?.onUpdate()
        var nextSate = this.getNextState()
        if( nextSate!= null)
        {
            this.stateControl.switchState(nextSate)
        }
    }

    onEnter()
    {
        this.actionState?.onEnter()
        for(const child of this.childStates)
        {
            if(child.condition.isAbleEnter())
            {
                this.child = child
                this.stateControl.switchState(child)
                return;
            }
        }
    }

    onExit()
    {
        this.actionState?.onExit()
        this.child?.onExit()
    }

    private getNextState() : State
    {
        let stateNext : State = null
        if(this.parrentState == null) return null;
        for(const friend of this.parrentState.childStates)
        {
            if(friend == this) continue
            if(friend.priority > this.priority  && friend.condition.isAbleEnter())
            {
                stateNext = friend
                break
            }
            if(friend.priority < this.priority && friend.condition.isAbleEnter() && this.condition.isAbleExit())
            {
                stateNext = friend
                break
            }
        }
        return stateNext
    }
}
