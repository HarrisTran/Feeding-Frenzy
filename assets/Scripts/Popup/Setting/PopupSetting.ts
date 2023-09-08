import { _decorator, Button, Component, director, log, Node, Slider, Toggle} from 'cc';
import { PopupBase } from '../../../Services/PopupSystem/PopupBase';
import { MainGameManager } from '../../Game/Manager/MainGameManager';
import { Game } from '../../Game';
const { ccclass, property } = _decorator;

@ccclass('PopupSetting')
export class PopupSetting extends PopupBase {
    @property(Slider) sfx: Slider = null;
    @property(Toggle) sfxChecker: Toggle = null;
    @property(Slider) music: Slider = null;
    @property(Toggle) musicChecker: Toggle = null;

    @property(Button) doneBtn: Button = null;
    @property(Button) backMenuBtn: Button = null;

    private volumeBeforeMute: number;

    protected onLoad(): void {
        this.sfx.node.on('slide',this.adjustSFX,this);
        this.music.node.on('slide',this.adjustBGM,this);
        this.sfx.node.on('touch-start',()=>this.sfxChecker.isChecked = true);
        this.music.node.on('touch-start',()=>this.musicChecker.isChecked = true);
        this.sfx.progress = MainGameManager.instance.audioManager.soundControl.getVolume();
        this.music.progress = MainGameManager.instance.audioManager.musicControl.getVolume();
    }

    protected onShowStart(): void {
        if(director.getScene().name == "Menu"){
            this.doneBtn.node.active = true;
            this.backMenuBtn.node.active = false;
        }else{
            this.doneBtn.node.active = false;
            this.backMenuBtn.node.active = true;
        }
        //this.sfx.progress = MainGameManager.instance.audioManager.soundControl.getVolume();
        //this.music.progress = MainGameManager.instance.audioManager.musicControl.getVolume();
    }

    private onPauseBtn(){
        Game.Instance.resumeGame();
    }
    
    private adjustSFX(volume: Slider){
        MainGameManager.instance.audioManager.soundControl.setSoundVolume(volume.progress);
    }

    private adjustBGM(volume: Slider){
        MainGameManager.instance.audioManager.musicControl.setSoundVolume(volume.progress);
    }

    private onCheckSFX(){
        if(this.sfxChecker.isChecked){
            this.unmuteSFX();
        }else{
            this.muteSFX();
        }
    }

    private onCheckMusic(){
        if(this.musicChecker.isChecked){
            this.unmuteBGM();
        }else{
            this.muteBGM();
        }
    }

    private muteSFX(){
        let source = MainGameManager.instance.audioManager.soundControl;
        source.setSoundVolume(0);
    }

    private unmuteSFX(){
        let source = MainGameManager.instance.audioManager.soundControl;
        source.setSoundVolume(this.sfx.progress);
    }

    private muteBGM(){
        let source = MainGameManager.instance.audioManager.musicControl;
        //this.volumeBeforeMute = source.getVolume();
        source.setSoundVolume(0);
    }

    private unmuteBGM(){
        let source = MainGameManager.instance.audioManager.musicControl;
        source.setSoundVolume(this.music.progress);
    }

    protected onHideStart(): void {
        if(director.getScene().name !== "Menu"){
            Game.Instance.resumeGame();
        }
    }

}

