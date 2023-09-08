import { EventTouch, Input, Vec3, log } from "cc";
import { JoystickDataType, SpeedType, instance } from "../../Joystick";

export class ReadInputJoystick{

    public currentSpeedType  = SpeedType.STOP
    public curentDirection = Vec3.ZERO;
    
    constructor()
    {
        instance.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        instance.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        instance.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    private onTouchStart() 
    {
  
    }
  
    private onTouchMove(event: EventTouch, data: JoystickDataType) 
    {
        this.currentSpeedType = data.speedType
        this.curentDirection = data.moveVec;
    }
  
    private onTouchEnd(event: EventTouch, data: JoystickDataType) 
    {
        this.currentSpeedType = data.speedType
    }

    public speedType() : SpeedType
    {
        return this.currentSpeedType;
    }

    public moveDirection()
    {
        return this.curentDirection;
    }

    

}