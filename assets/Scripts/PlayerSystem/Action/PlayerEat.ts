import { _decorator, log ,director, Scheduler, game} from "cc";
import { BasteState } from "./PlayerBaseState";

// const {ccclass, property} = _decorator

// @ccclass
export class PlayerEat extends BasteState{

    private timeCountDown : number ;

    public onEnter(): void {
        this.timeCountDown = 1/1.5;
        this.contents.playerAnimation.setAnimation(0,"Attack",false);
    }

    public onUpdate(deltaTime: number): void {
        this.timeCountDown -= deltaTime;
        if(this.timeCountDown<0)
        {
            this.states.switchState(this.states.Move);
        }
    }

    public isAbleEnterState(): boolean {
        return super.isAbleEnterState()
    }
}