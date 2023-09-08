import { _decorator, log } from "cc";
import { State } from "../State";
import { ConditionState } from "../ConditionState";
import { ActionOnState } from "../ActionOnState";
import { ActionContents } from "../FishContent/ActionContents";
import { ConditionChase } from "../Move/Chase/ConditionChase";
import { ConditionEscape } from "../Move/Escape/ConditionEscape";
import { ConditionMoveNormal } from "../Move/MoveNormal/ConditionMoveNormal";
import { ActionMoveNormal } from "../Move/MoveNormal/ActionMoveNormal";
import { ActionEscape } from "../Move/Escape/ActionEscape";
import { ActionChase } from "../Move/Chase/ActionChase";
import { ConditionTurnHorizontal } from "../Move/TurnHorizontal/ConditionTurnHorizontal";
import { ActionTurn } from "../Move/TurnHorizontal/ActionTurn";
import { ConditionTurnVertical } from "../Move/TurnVertical/ConditionTurnVertical";
import { ActionTurnVertical } from "../Move/TurnVertical/ActionTurnVertiacl";
import { StateControl } from "./StateControl";
import { ConditionEat } from "../Eat/Eat/ConditionEat";
import { ActionEat } from "../Eat/Eat/ActionEat";
import { ActionMove } from "../Move/ActionMove";


const {ccclass,property} =_decorator
@ccclass('IOStateControl')
export class IOStateControl extends StateControl
{
    move : State
       moveNormal : State
       chase : State
       escape : State
       turn : State
       turnVertical : State
    eat : State

    loadContent(contents: ActionContents): void {
        super.loadContent(contents)
    }
    start(): void {
        this.switchState(this.rootState)
    }

    createState(contents : ActionContents)
    {
        {
            this.move = new State("Move",this,new ConditionState(contents),new ActionMove(contents),0)
            {
                this.moveNormal = new State("Normal",this,new ConditionMoveNormal(contents),new ActionMoveNormal(contents),1)
                this.chase = new State("Chase",this,new ConditionChase(contents),new ActionChase(contents),2)
                this.escape = new State("Escape",this,new ConditionEscape(contents),new ActionEscape(contents),3)
                this.turn = new State("TurnHorizontal",this, new ConditionTurnHorizontal(contents), new ActionTurn(contents),4)
                this.turnVertical = new State("Turn Vertiacl",this, new ConditionTurnVertical(contents),new ActionTurnVertical(contents),4)
                this.move.addChildState(this.moveNormal)
                this.move.addChildState(this.chase)
                this.move.addChildState(this.escape)
                this.move.addChildState(this.turn)
                this.move.addChildState(this.turnVertical)
            }
            this.eat = new State("Eat",this,new ConditionEat(contents),new ActionEat(contents),1)
        }
        this.rootState.addChildState(this.move)
        this.rootState.addChildState(this.eat)

        
    }
}