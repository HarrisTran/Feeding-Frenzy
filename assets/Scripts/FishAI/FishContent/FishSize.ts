import { CCFloat, Component, _decorator } from "cc";

const {ccclass,property} =_decorator
@ccclass("FishSize")
export class FishSize extends Component
{
    @property(CCFloat) maxSize = 1.75
}