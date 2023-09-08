import { _decorator, Component, director, JsonAsset, Label, log, MainFlow, Node, randomRangeInt, sp, Sprite, Tween, tween } from 'cc';
import { PopupBase } from '../../../Services/PopupSystem/PopupBase';
import { Tag } from '../../MatchingUI/Tag';
import { NameStatic } from '../../MatchingUI/NameStatic';
import { MainGameManager } from '../../Game/Manager/MainGameManager';
import { PlayerImage } from '../../PlayerSystem/PlayerImage';
const { ccclass, property } = _decorator;

@ccclass('PopupMatching')
export class PopupMatching extends PopupBase {
    @property(Label) nameString : Label = null;
    @property(Sprite) energyLoading: Sprite = null;
    @property([Tag]) tags: Tag[] = []; 
    @property(JsonAsset) nameSample: JsonAsset = null;
    @property(Node) fishPlayer: Node = null;
    private names : string[] = [];

   //callBack : Function
    //tween : Tween<Sprite>
    progressLoadingDone: boolean = false;

    protected onShowStart(): void {
        this.names = this.nameSample.json.sample as string[];
        this.energyLoading.fillRange = 0;

        for(var i = 0; i< this.names.length-2; i++)
        {
            const j = randomRangeInt(i+1, this.names.length-1);
            [this.names[i],this.names[j]] = [this.names[j],this.names[i]];
        }
        this.tags.forEach((tag,index) => {
            tag.playLoading();
            tag.getComponentInChildren(Label).string = this.names[index];
        })

        director.preloadScene("GameScene",
        (completedCount: number, totalCount: number, item: any) =>{
            this.energyLoading.fillRange = completedCount/ totalCount;
        },
        ()=>{
            this.progressLoadingDone = true;
        })

        if(NameStatic.getInstance() == null)
        {
            const names = new NameStatic()
        }
 
        NameStatic.getInstance()?.setListNames(this.names)

        const data = MainGameManager.instance.dataPlayerManager;
        this.nameString.string = data.getUsername();
        this.fishPlayer.getComponent(PlayerImage).changeFishUI(data.getEquipedFish());
    }

    protected update(dt: number): void {
        if(this.progressLoadingDone && this.tags.every(e=>e.loadingDone==true)){
            this.fishPlayer.getComponentInChildren(sp.Skeleton).paused = true;
            director.loadScene("GameScene");
        }
    }

    
    stopLoad()
    {
        director.loadScene("Menu");
        this.hide()
    }

}

