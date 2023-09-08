import { _decorator, Component, Label, log, Node } from 'cc';
import { PopupType } from '../Services/PopupSystem/PopupType';
import { MainGameManager } from './Game/Manager/MainGameManager';
const { ccclass, property } = _decorator;

@ccclass('Clock')
export class Clock extends Component {
    @property(Label) private timeLb: Label = null;

    private timeRemaining : number;
    public timerIsRunning : boolean = false;

    start() {
        this.timerIsRunning = false;
    }

    public init(timeRemaining: number)
    {
        this.timeRemaining = timeRemaining;
        this.timerIsRunning = true;
    }

    public gameTick(deltaTime: number){
            if(this.timeRemaining > 0){
                this.timeRemaining -= deltaTime;
                this.displayTime(this.timeRemaining);
            }
            else{
                this.timeRemaining = 0;
                this.timerIsRunning = false;
                MainGameManager.instance.popupManager.showPopup(PopupType.VICTORY);
            }
    }

    private displayTime(timeToDisplay: number){
        if(timeToDisplay <= 0) return;
        const minutes = Math.floor(timeToDisplay / 60);
        const seconds = Math.floor(timeToDisplay % 60);
        this.timeLb.string = `${minutes}:${seconds}`;
    }
}

