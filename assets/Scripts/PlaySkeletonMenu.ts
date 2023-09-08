import { Component, _decorator, sp } from "cc";

const {ccclass,property} = _decorator
@ccclass
export class PlaySkelentonMenu extends Component
{
    @property(sp.Skeleton) ske : sp.Skeleton

    protected onLoad(): void {
        this.ske.addAnimation(0,"idle",true)
    }
}


// Ở menu animation fish nó play on load nên ko cần script này