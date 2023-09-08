import { Component, Vec3, _decorator, Node, CCFloat, log } from "cc";
const {ccclass,property} = _decorator;

@ccclass
export class LimitFollow extends Component{

    @property({type : CCFloat }) private a : number
    @property({type : CCFloat }) private b : number


    cam : Node

    protected onLoad(): void {
        this.cam = this.node
    }

    public isFollow(target : Vec3)
    {
        var sub_x = target.x - this.cam.position.x
        var sub_y = target.y - this.cam.position.y

        var resutle = (sub_x*sub_x)/(this.a*this.a) + (sub_y*sub_y)/(this.b*this.b) >=1
        return resutle;
    }

}