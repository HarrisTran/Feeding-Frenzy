import { _decorator, log } from "cc";
import { IOnEatFail } from "../PlayerSystem/Content/EatReader";
import { PlayerSingleton } from "../PlayerSystem/PlayerSingleton";

const {ccclass,property} = _decorator

@ccclass('EatFailAdapter')
export class EatFailAdapter implements IOnEatFail
{

    private onEatFailCallback: (() => void) = null;

    public constructor(action : (() => void))
    {
        PlayerSingleton.getInstance().contents.eatReader.OnEatFails.push(this)
        this.onEatFailCallback = action
    }

    public onEatFail(): void 
    {
        this.onEatFailCallback()
    }
}