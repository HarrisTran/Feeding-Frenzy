import { log } from "cc";
import { BasteState } from "./PlayerBaseState";
import { SpeedType } from "../../Joystick";

export class PlayerIdle extends BasteState {
    
    public onUpdate(deltaTime: number): void {
        if(this.contents.ReadJoystick.currentSpeedType == SpeedType.NORMAL)
        {
            this.states.switchState(this.states.Move)
        }
    }
}