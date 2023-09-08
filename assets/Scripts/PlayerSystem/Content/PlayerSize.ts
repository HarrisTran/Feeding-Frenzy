import { Component, UITransform, Vec2, _decorator, Node, log, CCFloat } from "cc";
import { IOnEat } from "./EatReader";
import { EatAble } from "../../EatAble/EatAble";
import { PlayerSingleton } from "../PlayerSingleton";
import { Fish } from "../../Common/Fish";
const {ccclass, property} = _decorator

@ccclass
export class PlayerSize extends Component implements IOnEat
{
    @property(Node) playerTransfrom : Node
    @property(UITransform) public Size : UITransform
    @property(CCFloat)
    currentSize = 1;

    protected onLoad(): void {
        this.playerTransfrom = this.node
        this.updateSize()
        this.Size = this.node.getComponent(UITransform)
    }
    

    updateSize()
    {
        this.playerTransfrom.setScale(this.currentSize,this.currentSize)
    }

    
    public plusSize(sizePlus : number)
    {
        if(this.currentSize>= 1.75) return
        this.currentSize += sizePlus
        if(this.currentSize > 1.75) this.currentSize = 1.75
        this.updateSize()
    }

    public subSize(sizeSub : number)
    {
        this.currentSize -= sizeSub;
        this.updateSize()
    }

    onEat(eatAble ? : Fish): void {
        var fish = eatAble ? eatAble.exp : 0
        this.plusSize(fish*0.01);
        //PlayerSingleton.getInstance().contents.evolution.feeding(10);
    }

    public sizeOnScene() : Vec2
    {
        var x = this.Size.contentSize.x*this.currentSize;
        var y = this.Size.contentSize.y*this.currentSize;
        return new Vec2(x,y)
    }

}