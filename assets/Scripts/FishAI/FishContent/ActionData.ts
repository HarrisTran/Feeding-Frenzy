import { FishType } from "../../Unit/FishType";


export class MoveAndEscape
{
    constructor(public move: number,public escape : number)
    {
        this.move = move;
        this.escape = escape
    }
}
export const SPEED_CHASCE : Map<FishType,number> = new Map([
    [FishType.FISH1,0],
    [FishType.FISH2,0],
    [FishType.FISH3,0],
    [FishType.FISHIO,300],
]);

export const SPEED_BASE : Map<FishType,MoveAndEscape> = new Map([
    [FishType.FISH1,new MoveAndEscape(100,200)],
    [FishType.FISH2,new MoveAndEscape(120,300)],
    [FishType.FISH3,new MoveAndEscape(100,200)],
    [FishType.FISHIO,new MoveAndEscape(300,400)],
    [FishType.SAOBIEN,new MoveAndEscape(120,120)],
    [FishType.JELLY,new MoveAndEscape(120,120)],

]);


export class Reward{
    constructor(public exp: number,public gold : number)
    {

    }
}
export const REWARD : Map<FishType,Reward> = new Map([
    [FishType.FISH1,new Reward(1,0)],
    [FishType.FISH2,new Reward(2,0)],
    [FishType.FISH3,new Reward(3,0)],
    [FishType.FISHIO,new Reward(0,0)],
    [FishType.JELLY,new Reward(4,0)],
]);



