import { _decorator, Button, Component, EventKeyboard, input, Input, KeyCode, Node, NodeEventType, Sprite } from 'cc';
import { SpeedType } from './Joystick';
const { ccclass, property } = _decorator;

@ccclass('SpeedControl')
export class SpeedControl extends Component {
    @property(Sprite)
    private speedBar: Sprite = null;

    @property(Button)
    private speedButton: Button = null;

    private storm : Node = null;
    private inSubtraction : boolean;
    private speedType: SpeedType;

    protected onLoad(): void {
        this.storm = this.speedButton.node.getChildByName("Storm");

        this.speedButton.node.on(NodeEventType.TOUCH_START,()=>{
            this.onTouchStartEvent();
        });

        this.speedButton.node.on(NodeEventType.TOUCH_END,()=>{
            this.onTouchEndEvent();
        });
        // input.on(Input.EventType.KEY_DOWN,this.onTouchStartEvent,this);
        // input.on(Input.EventType.KEY_UP,this.onTouchEndEvent,this);
    }

    public init(){
        this.speedType = SpeedType.NORMAL;
        this.speedBar.fillRange = 1;
    }

    public gameTick(deltaTime: number)
    {
        if(!this.inSubtraction) {
            this.speedBar.fillRange += deltaTime/20;
        }else{
            this.subtractSpeedRange();
        }
    }

    public getSpeedType(){
        return this.speedType;
    }

    private subtractSpeedRange(){
        if(this.speedBar.fillRange>0){
            this.speedBar.fillRange -= 0.005;
            this.spinStorm();
        }else{
            this.speedType = SpeedType.NORMAL;
        }
    }

    private onTouchStartEvent() {
        this.inSubtraction = true;
        this.storm.active = true;
        this.speedType = SpeedType.FAST;
        this.subtractSpeedRange();
    }

    private onTouchEndEvent(){
        this.inSubtraction = false;
        this.storm.active = false;
        this.speedType = SpeedType.NORMAL;
    }

        

    private spinStorm(){
        this.storm.active = true;
        let z = this.storm.eulerAngles.z;
        this.storm.setRotationFromEuler(0,0,z-5);
    }

}

