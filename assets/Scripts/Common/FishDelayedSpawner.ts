import { _decorator, Component, log, Node } from 'cc';
import { FishSpawner } from './FishSpawner';
import { GameTimer } from './GameTimer';
import { random } from './Utils';
import { IndividualFishSpawners } from '../Setting/GameSetting';
import { CameraFollow } from '../CameraFollow/CameraFollow';
import { CameraManager } from '../Game/Manager/CameraManager';
const { ccclass, property } = _decorator;

@ccclass('FishDelayedSpawner')
export class FishDelayedSpawner{
    private currentTime = 0;
    private startDelay : number;
    private stopDelay: number;
    private spawnTimer: GameTimer;
    private fishId: string;
    
    public constructor(private fishSpawner: FishSpawner, settings: IndividualFishSpawners)
    {
        this.startDelay = settings.startDelay;
        if(settings.stopDelay === -1){
            this.stopDelay = Number.MAX_SAFE_INTEGER;
        }
        this.spawnTimer = new GameTimer(settings.cooldown);
        this.fishId = settings.fishId;
    }

    public gameTick(deltaTime: number): void
    {
        this.currentTime += deltaTime;
        if(this.startDelay <= this.currentTime && this.currentTime <= this.stopDelay){
            this.delayGameTick(deltaTime);
        }
    }

    public delayGameTick(deltaTime: number): void{
        this.spawnTimer.gameTick(deltaTime);
        if(this.spawnTimer.tryFinishPeriod()){
            // const randomSide = Math.random() < 0.5;
            // let posX : number = 0;
            // if(randomSide){
            //     posX = -2048;
            // }else{
            //     posX = 2048;
            // }
            const varianDistance : number = random(400,800);
            var posX = this.getPosCam().x + (Math.random() < 0.5 ? this.getCameraWorldSize().x+ varianDistance : -this.getCameraWorldSize().x-varianDistance);
            var posY = random(this.getCameraWorldSize().y/-2,this.getCameraWorldSize().y/2)
            this.fishSpawner.spawnNewFish(posX,posY,this.fishId);
        }
    }

    getPosCam()
    {
        return CameraManager.getInstance().stateFollow.node.worldPosition
    }
    getCameraWorldSize()
    {
        return CameraManager.getInstance().CameraSize.cameraWorldSize()
    }

}

