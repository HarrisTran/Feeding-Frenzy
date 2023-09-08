import { CCInteger, Component, Sprite, UITransform, _decorator } from "cc";

const {ccclass,property} = _decorator
@ccclass
export class BackGround extends Component
{
    public uiSize : UITransform
    private static instance : BackGround;

    protected onLoad(): void {
        BackGround.instance = this;
    }

    public static getInstance()
    {
        return BackGround.instance;
    }
}