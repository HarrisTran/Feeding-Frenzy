import { _decorator, animation, Animation, Camera, Component, director, game, JsonAsset, Label, log, Node, UITransform } from 'cc';
import { Clock } from './Clock';
import { GameUI } from './Game/GameUI';
import { FishManager } from './Game/Manager/FishManager';
import { Pauser } from './Game/Pauser';
import { PlayerContents } from './PlayerSystem/Content/PlayerContent';
import { AudioManager } from '../Services/AudioSystem/AudioManager';
import { MainGameManager } from './Game/Manager/MainGameManager';
import { PopupType } from '../Services/PopupSystem/PopupType';
import { MusicName } from '../Services/AudioSystem/Music/MusicConfig';

const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {

    private static instance : Game;

    @property(PlayerContents) private player: PlayerContents;

    @property(FishManager) private fishManager: FishManager;

    @property(Clock) private clock: Clock;

    @property(JsonAsset) private settings: JsonAsset;

    @property(GameUI) private gameUI: GameUI;

    @property(Animation) private countdown: Animation ;

    private gamePauser : Pauser = new Pauser();

    private isStartGame = false;

    public static get Instance(): Game
    {
        return this.instance;
    }

    protected onLoad()
    {
        const canvasSize = this.node.getComponent(UITransform);
        this.gameUI.getComponent(UITransform).contentSize = canvasSize.contentSize;
        
        Game.instance = this;
        this.fishManager.init(this.settings.json.fishManager);
        this.clock.init(90);
    }

    protected start()
    {
        if(this.countdown && this.countdown.defaultClip){
            // force quit popup
            this.countdown.on(Animation.EventType.PLAY,()=>{
                MainGameManager.instance.popupManager.getPopup(PopupType.MATCHING).hideImmediately();
            },this);
            this.countdown.on(Animation.EventType.FINISHED,this.onCompleted,this);
        }
        this.gamePauser.resume();
        this.gameUI.init();
    }

    private onCompleted()
    {
        MainGameManager.instance.audioManager.musicControl.playMusic(MusicName.GAMEPLAY_THEME);
        this.countdown.node.active = false;
        this.isStartGame = true;
    }

    protected update(deltaTime: number)
    {
        if(this.gamePauser.IsPaused || this.isStartGame == false) return;
        this.player.gameTick(deltaTime);
        this.fishManager.gameTick(deltaTime);
        this.clock.gameTick(deltaTime);
    }

    public pauseGame(): void
    {
        this.gamePauser.pause();
    }   

    public resumeGame(): void
    {
        this.gamePauser.resume();
    }

    public static getInstance() : Game
    {
        return Game.instance
    }
}

