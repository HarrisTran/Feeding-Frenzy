import { _decorator, Animation, Component, Node } from 'cc';
import { Fish } from './Fish';
const { ccclass, property } = _decorator;

@ccclass('AnimatedFish')
export class AnimatedFish extends Fish {
    @property(Animation)
    private animation : Animation = null;

    private isAnimatingIdle = false;

    private animateIdle() : void
    {
        if(this.isAnimatingIdle) return;
        this.isAnimatingIdle = true;

        this.animation.play("Idle");
    }

    private animateTurn() : void
    {
        if(!this.isAnimatingIdle) return;
        this.isAnimatingIdle = false;

        this.animation.play("Turn");
    }

    private animateSwim() : void
    {
        if(!this.isAnimatingIdle) return;
        this.isAnimatingIdle = false;

        this.animation.play("Swim");
    }

}

