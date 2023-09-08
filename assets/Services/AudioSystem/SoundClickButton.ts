import { _decorator, Button, Component, EventHandheld, EventHandler, log, Node, Toggle } from 'cc';
import { AudioManager } from './AudioManager';
import { MainGameManager } from '../../Scripts/Game/Manager/MainGameManager';
import { SoundName } from './Sound/SoundConfig';
const { ccclass, property } = _decorator;

@ccclass('SoundClickButton')
export class SoundClickButton extends Component {

    eventHandle : EventHandler
    button: Button
    toggle: Toggle

    protected onLoad(): void {
        this.eventHandle = new EventHandler();
        this.eventHandle.target = this.node;
        this.eventHandle.component = "SoundClickButton";
        this.eventHandle.handler = "playSound";

        this.button = this.getComponent(Button)
        if(this.button){
            this.button.clickEvents.push(this.eventHandle);
        }

        this.toggle = this.getComponent(Toggle)
        if(this.toggle){
            this.toggle.clickEvents.push(this.eventHandle);
        }

        //this.button.clickEvents.push(this.eventHandle)
    }

    playSound()
    {
        MainGameManager.instance.audioManager.soundControl.playSound(SoundName.CLICKBUTTON);
    }
}

