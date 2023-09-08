import { Vec3, _decorator, log } from "cc";
import { BasteState } from "./PlayerBaseState";
import { SpeedType } from "../../Joystick";
import { PlayerMovementLimit } from "../Content/PlayerMovementLimit";
import { PlayerContents } from "../Content/PlayerContent";

// const {ccclass, property} = _decorator

// @ccclass
export class PlayerMove extends BasteState{

    moveLimit : PlayerMovementLimit = null;
    private speed : number = 0;

    public loadContents(playerContents: PlayerContents, states: any): void {
        super.loadContents(playerContents,states)
        this.moveLimit = playerContents.movementLimit
    }
    public onEnter(): void {
        this.contents.playerAnimation.setAnimation(0,"Idle",true);
        //this.contents.Animator.setValue('eatActive',false)
    }

    public onExit(): void {
        
    }

    public onUpdate(deltaTime: number): void {
        // if(this.contents.ReadJoystick.currentSpeedType == SpeedType.STOP)
        // {
        //     this.states.switchState(this.states.Idle)
        // }
        // if(this.contents.ReadJoystick.currentSpeedType === SpeedType.NORMAL){
        //     this.speed = 8;
        // }
        // if(this.contents.ReadJoystick.currentSpeedType === SpeedType.FAST){
        //     this.speed = 10;
        // }
        // this.move();
    }

    // private move() 
    // {
    //     var player = this.contents.Player;
    //     var moveDirection = this.catulatorMoveDirection()
    //     player.eulerAngles = new Vec3(0, moveDirection.x < 0 ? 0 : 180, 0);
    //     const oldPos = player.getPosition();
    //     const newPos = oldPos.add(moveDirection.clone().multiplyScalar(this.speed)); // fps : 60;
    //     player.setPosition(newPos);
    // }



    // private catulatorMoveDirection()
    // {  
    //     var joystickDirection  = this.contents.ReadJoystick.moveDirection();
    //     var isLockX = !((this.moveLimit.isLockRight() && !this.moveLimit.isPlayerInLeftCamera() && joystickDirection.x > 0)  || (this.moveLimit.isLockLeft() && this.moveLimit.isPlayerInLeftCamera() && joystickDirection.x < 0))
    //     var xDirectionMove = isLockX == true? this.contents.ReadJoystick.moveDirection().x : 0
        
    //     var isLockY = !((this.moveLimit.isLockTop() && !this.moveLimit.isPlayerInBotCamera()) && joystickDirection.y > 0 || (this.moveLimit.isLockBot() && this.moveLimit.isPlayerInBotCamera() && joystickDirection.y < 0))
    //     var yDirectionMove = isLockY == true? this.contents.ReadJoystick.moveDirection().y : 0

    //     return new Vec3(xDirectionMove, yDirectionMove,this.contents.ReadJoystick.moveDirection().z)
    // }

    public isAbleEnterState(): boolean {
        return super.isAbleEnterState()
    }
}