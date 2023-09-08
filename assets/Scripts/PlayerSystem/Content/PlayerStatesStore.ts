import { _decorator, log } from "cc";
import { BasteState } from "../Action/PlayerBaseState";
import { PlayerMove } from "../Action/PlayerMove";
import { PlayerContents } from "./PlayerContent";
import { PlayerEat } from "../Action/PlayerEat";
import { PlayerIdle } from "../Action/PlayerIdle";
import { IOnEat } from "./EatReader";
import { EatAble } from "../../EatAble/EatAble";
import { Fish } from "../../Common/Fish";
const {ccclass, property} = _decorator;

@ccclass("PlayerStatesStore")
export class PlayerStatesStore implements IOnEat
{

    public currentState : BasteState;
    public Move : PlayerMove = new PlayerMove()
    public Eat : PlayerEat = new PlayerEat()
    public Idle : PlayerIdle = new PlayerIdle()

    public loadContents(contents : PlayerContents)
    {
        this.Move.loadContents(contents,this)
        this.Eat.loadContents(contents,this)
        this.Idle.loadContents(contents,this)

        this.switchState(this.Idle)
    }


    public switchState(currentState : BasteState)
    {
        this.currentState = currentState;
        this.currentState.onEnter();
    }

    onEat(eatAble ? : Fish): void {
        if(this.currentState === this.Eat) return
        this.switchState(this.Eat)
    }
}