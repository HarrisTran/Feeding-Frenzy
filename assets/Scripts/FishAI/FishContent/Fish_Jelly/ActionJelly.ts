import { _decorator } from "cc";
import { ActionContents } from "../ActionContents";
import { JellyState } from "../../StateControls/JellyState";

const {ccclass,property} =_decorator
@ccclass('ActionJelly')
export class ActionJelly extends ActionContents
{
    private io = new JellyState()
    protected start(): void {
        super.start()
        this.stateControl = this.io
        this.stateControl.loadContent(this)
        this.stateControl.start()
    }
}