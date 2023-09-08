import { _decorator } from "cc";

const {ccclass} =_decorator
@ccclass('ResultManager')
export class ResultManager 
{
    private static _instance : ResultManager

    currentRank = 0
    currentKill = 0
    constructor()
    {
        if(ResultManager._instance)
        {
            return
        }
        else
        {
            ResultManager._instance = this
        }
    }

    public static get  instance() : ResultManager
    {
        return ResultManager._instance
    }

    reset()
    {
        this.currentRank = 0
        this.currentKill = 0
    }
}