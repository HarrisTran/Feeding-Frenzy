import { Component, _decorator,Node, Vec3, Vec2, log, EventTouch, Input } from "cc";
import { CameraFollow } from "../../CameraFollow/CameraFollow";
import { CameraSize } from "../../CameraFollow/CameraSize";
import { LimitFollow } from "../../CameraFollow/LimitFollow";
import { StatePosition } from "../../CameraFollow/StatePosition";
import { SpeedType, instance, JoystickDataType } from "../../Joystick";

const {ccclass, property} = _decorator;

@ccclass
export class CameraManager extends Component
{


    private static instance : CameraManager = null

    @property({type : Node }) public Camera : Node;
    @property({type : Node }) public Target : Node;
    _speedType = SpeedType.STOP;

    //Composition

    @property(LimitFollow) public limitFollow : LimitFollow;
    @property(CameraFollow) public cameraFollow: CameraFollow
    @property(StatePosition) public stateFollow : StatePosition
    @property(CameraSize) public CameraSize : CameraSize


    protected onLoad(): void {
        CameraManager.instance = this;

        this.limitFollow = this.getComponent(LimitFollow)
        this.cameraFollow = this.getComponent(CameraFollow)
        this.CameraSize = this.getComponent(CameraSize)
        this.stateFollow = this.getComponent(StatePosition)
        this.Camera = this.node
    }

    protected start(): void {
        instance.on(Input.EventType.TOUCH_MOVE,this.onTouchMove,this)
        instance.on(Input.EventType.TOUCH_END,this.onTouchEnd,this)
    }


    protected update(dt: number): void {
        if(this._speedType === SpeedType.STOP) return;
        if(this.limitFollow.isFollow(this.Target.position))
        {
            var isFollowInX = !((this.stateFollow.isLockHorizontalRight() && !this.isTargetInLeft()) || (this.stateFollow.isLockHorizontalLeft() && this.isTargetInLeft()))
            var xTarget = isFollowInX == true? this.Target.position.x : this.Camera.position.x

            var isFollowInY = !((this.stateFollow.isLockVerticalTop() && !this.isTargetInBot()) || (this.stateFollow.isLockVerticalBot() && this.isTargetInBot()))
            var yTarget = isFollowInY == true? this.Target.position.y : this.Camera.position.y

            this.cameraFollow.followTarget(xTarget,yTarget)
        }
    }


    isTargetInLeft()
    {
        return (this.Target.position.x - this.Camera.position.x <0)
    }
    isTargetInBot()
    {
        return (this.Target.position.y - this.Camera.position.y <0)
    }


    protected onDestroy(): void {
        instance.off(Input.EventType.TOUCH_MOVE,this.onTouchMove,this)
        instance.off(Input.EventType.TOUCH_END,this.onTouchEnd,this)
    }

    private onTouchMove(event: EventTouch, data: JoystickDataType) 
    {
        this._speedType = data.speedType;
    }

    private onTouchEnd(event: EventTouch, data: JoystickDataType) 
    {
        this._speedType = data.speedType;
    }

    public static getInstance() : CameraManager
    {
        return CameraManager.instance;
    }
}
