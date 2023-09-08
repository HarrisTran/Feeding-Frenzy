import { CCFloat, _decorator } from "cc";
import { random } from "../Common/Utils";

const {ccclass,property} =_decorator

@ccclass('TimeRangeAction')
export class TimeRandomAction
{
    @property(CCFloat) numberOne : number =0
    @property(CCFloat) numberTwo : number =0

    random() {return random(this.numberOne,this.numberTwo)}
}