import { _decorator, Component, Node } from 'cc';
import { IFishMover } from './IFishMover/IFishMover';
import { Fish } from '../Fish';
const { ccclass, property } = _decorator;

@ccclass('AIMover')
export class AIMover implements IFishMover {
    addFish(fish: Fish): void {
        throw new Error('Method not implemented.');
    }
    removeFish(fish: Fish): void {
        throw new Error('Method not implemented.');
    }
    gameTick(deltaTime: number): void {
       
    }
    turnFish(fish: Fish): void {
        throw new Error('Method not implemented.');
    }
}

