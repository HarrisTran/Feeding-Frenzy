import { _decorator } from "cc";
import { PlayerContents } from "../Content/PlayerContent";
import { PlayerStatesStore } from "../Content/PlayerStatesStore";

const {ccclass, property} = _decorator

@ccclass

export class BasteState
{
    protected contents : PlayerContents
    protected states : PlayerStatesStore

    public loadContents(playerContents : PlayerContents,states : any)
    {
        this.contents = playerContents;
        this.states = states;
    }

    public onEnter()
    {

    }

    public onExit(){

    }
    
    public onUpdate(deltaTime: number)
    {

    }

    public isAbleEnterState()
    {
        return false;
    }
}