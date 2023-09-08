import { Fish } from "../../Fish";

export interface IFishMover {
    addFish(fish: Fish) : void;
    removeFish(fish: Fish): void;
    gameTick(deltaTime: number) : void;
    turnFish(fish: Fish): void;
}
