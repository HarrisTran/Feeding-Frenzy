import { _decorator } from "cc";
import { State } from "../State";
import { ConditionState } from "../ConditionState";
import { ActionOnState } from "../ActionOnState";
import { ActionContents } from "../FishContent/ActionContents";
import { ConditionEscape } from "../Move/Escape/ConditionEscape";
import { ConditionMoveNormal } from "../Move/MoveNormal/ConditionMoveNormal";
import { ActionMoveNormal } from "../Move/MoveNormal/ActionMoveNormal";
import { ActionEscape } from "../Move/Escape/ActionEscape";
import { ConditionTurnHorizontal } from "../Move/TurnHorizontal/ConditionTurnHorizontal";
import { ActionTurn } from "../Move/TurnHorizontal/ActionTurn";
import { ConditionTurnVertical } from "../Move/TurnVertical/ConditionTurnVertical";
import { ActionTurnVertical } from "../Move/TurnVertical/ActionTurnVertiacl";
import { StateControl } from "./StateControl";

const {ccclass,property} =_decorator
@ccclass('NPCStateControl')
export class NPCStateControl extends StateControl
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
        this.switchState(this.move)
    }

    createState(contents : ActionContents)
    {
        {
            this.move = new State("Move",this,new ConditionState(contents),new ActionOnState(contents),0)
            {
                this.moveNormal = new State("Normal",this,new ConditionMoveNormal(contents),new ActionMoveNormal(contents),1)
                this.escape = new State("Escape",this,new ConditionEscape(contents),new ActionEscape(contents),3)
                this.move.addChildState(this.moveNormal)
                this.move.addChildState(this.escape)
            }
        }
        this.rootState.addChildState(this.move)
    }
}