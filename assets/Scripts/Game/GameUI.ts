import { _decorator, Animation, AnimationClip, Button, Component, Label, log, Node, ProgressBar, Sprite, SpriteFrame, Toggle, tween, Vec3 } from 'cc';
import { Game } from '../Game';
import { MainGameManager } from './Manager/MainGameManager';
const { ccclass, property } = _decorator;

@ccclass('GameUI')
export class GameUI extends Component {

    private static _instance : GameUI
    @property(Label) private fishesText : Label = null!;
    @property(Label) goldString : Label = null;
    @property(Sprite) background: Sprite = null!;
    @property(Node) fishPanel: Node = null;

    @property([SpriteFrame]) backgroundList : SpriteFrame[] = [];

    private fishCount: number;
    
    protected start(): void {
        GameUI._instance = this
        let data = MainGameManager.instance.dataPlayerManager;
        this.background.spriteFrame = this.backgroundList[data.getBgIndex()];
        this.goldString.string = data.getGold().toString();
    }

    public init(){
        this.fishCount = 0;
        this.fishesText.string = this.fishCount.toString();
    }
    
    public updateProgressBar(): void
    {
        this.fishCount++;
        
        this.fishPanel.getChildByName("Fishes").active = true;

        let curScale = this.fishPanel.getScale();
        if(curScale !== Vec3.ONE){
            this.fishPanel.setScale(curScale.x+0.01,curScale.y+0.01,curScale.z+0.01);
            this.fishPanel.getComponentInChildren(Animation).play();
        }
        
        this.fishesText.string = this.fishCount.toString();
    }

    getFishCount() { return  this.fishCount}

    private onClickPause()
    {
        Game.Instance.pauseGame();
    }

    public static get instance()
    {
        return GameUI._instance
    }
}

