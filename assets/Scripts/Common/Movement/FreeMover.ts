import { _decorator, Component, Node, Vec3 } from 'cc';
import { Fish } from '../Fish';
import { IFishMover } from './IFishMover/IFishMover';
const { ccclass, property } = _decorator;

@ccclass('FreeMover')
export class FreeMover implements IFishMover {
    protected fishes: Fish[] = [];
    private fishToDirection: Map<Fish,Vec3> = new Map<Fish,Vec3>();

    public addFish(fish: Fish): void {
        let direction : Vec3 = new Vec3();
        let position : Vec3 = fish.node.position;
        direction = Vec3.subtract(direction,new Vec3(0,position.y,position.z),position);
        this.fishToDirection.set(fish,direction.normalize());

        this.fishes.push(fish);
    }
    public removeFish(fish: Fish): void {
        this.fishToDirection.delete(fish);
        const index : number = this.fishes.indexOf(fish);
        if(index !== -1){
            this.fishes.splice(index,1);
        }
    }
    public gameTick(deltaTime: number): void {
        this.fishes.forEach((fish) => {
            fish.gameTick(this.fishToDirection.get(fish),deltaTime);
        })
    }

    public turnFish(fish: Fish): void {
        let fishDirection = this.fishToDirection.get(fish);
        this.fishToDirection.set(fish,fishDirection.clone().negative());
    }
}

