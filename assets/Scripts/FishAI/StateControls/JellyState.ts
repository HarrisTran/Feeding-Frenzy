import { _decorator } from "cc";
import { StateControl } from "./StateControl";
import { ActionContents } from "../FishContent/ActionContents";
import { State } from "../State";
import { ConditionState } from "../ConditionState";
import { ActionJellyMove } from "../Move/JellyMove/ActionJellyMove";

const {ccclass,property} = _decorator
@ccclass('JellyState')
export class JellyState extends StateControl
{
    move : State
    loadContent(contents: ActionContents): void {
        super.loadContent(contents)
    }
    start(): void {
        this.switchState(this.rootState)
    }

    createState(contents: ActionContents): void {
        this.move= new State("Jelly",this,new ConditionState(contents),new ActionJellyMove(contents))
        this.rootState.addChildState(this.move)
    }
}