import { CCBoolean, CCFloat, Collider, Collider2D, Component, Contact2DType, Node, NodeEventType, TERRAIN_HEIGHT_BASE, _decorator, log } from "cc";
import { StateControl } from "../StateControls/StateControl";
import { TimeRandomAction } from "../TimeRangeAction";
import { EscapeContents } from "./EscapeContents";
import { NPCStateControl } from "../StateControls/NPCStateControl";
import { Fish } from "../../Common/Fish";
import { SPEED_BASE } from "./ActionData";
import { BackGround } from "../../Common/BackGround";


const {ccclass, property} = _decorator
@ccclass('ActionContents')
export class ActionContents extends Component
{

    @property(CCBoolean) isIO = true
    @property(TimeRandomAction) timeMove = new TimeRandomAction()
    @property(TimeRandomAction) timeIdle = new TimeRandomAction()
    @property(CCFloat) speedMove = 200
    @property(EscapeContents) escapeContents : EscapeContents = new EscapeContents()
    stateControl : StateControl = new NPCStateControl()
    safeFish : Fish
    public loadSetting(fish : Fish)
    {
        this.safeFish = fish
        this.speedMove = SPEED_BASE.get(this.safeFish.type).move
    }
    protected start(): void {
        this.stateControl.loadContent(this)
        this.escapeContents?.loadContent(this)
        this.stateControl.start()
    }
    
    public onActionUpdate(dt : number)
    {
        this.stateControl.currentState.onUpdate()
        var posBG = BackGround.getInstance().node.worldPosition
        var checkX = this.safeFish.node.worldPosition.x >= posBG.x+2200 || this.safeFish.node.worldPosition.x <= posBG.x-2200
        var checkY = this.safeFish.node.worldPosition.y >= posBG.y+2200 || this.safeFish.node.worldPosition.y <= posBG.y-2200
        if(checkX || checkY)
        {
            this.safeFish.wasEte()
        }
    }
    
    public resetAction()
    {
        this.stateControl.start()
        this.escapeContents?.resetContent()
        this.stateControl.start()
    }
}