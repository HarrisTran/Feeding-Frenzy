import { CCFloat, CCInteger, Component, _decorator } from "cc";

const {ccclass,property} =_decorator

@ccclass
export class EatAble extends Component{
    @property(CCInteger) power : number = 0
}