import { CCFloat, _decorator } from "cc";
import { ActionContents } from "../FishContent/ActionContents";
import { EatContents } from "../FishContent/EatContents";
import { ChaseContents } from "../FishContent/ChaseContents";
import { IOStateControl } from "../StateControls/IOStateControl";

const {ccclass,property} =_decorator
@ccclass('ActionIO')
export class ActionIO extends ActionContents
{
    @property(CCFloat) speedChase : number
    @property(EatContents) eatContent : EatContents = new EatContents()
    @property(ChaseContents) chaseContent : ChaseContents = new ChaseContents()

    private io = new IOStateControl()
    protected start(): void {
        super.start()
        this.stateControl = this.io
        this.stateControl.loadContent(this)
        this.stateControl.start()
        this.eatContent.loadContent(this)
        this.chaseContent.loadContent(this)
    }

    public resetAction(): void {
        super.resetAction()
        this.chaseContent?.resetContent()
    }
}