import { _decorator, Component, Label, labelAssembler, Node, Sprite } from 'cc';
import { MainGameManager } from '../Game/Manager/MainGameManager';
import { PopupType } from '../../Services/PopupSystem/PopupType';
import { RankManager } from '../FishManager/RankManager';
import { ResultManager } from '../Common/ResultManager';
const { ccclass, property } = _decorator;

@ccclass('Result')
export class Result extends Component {
    @property(Label) nameString : Label = null;
    

    @property(Label) rank : Label = null
    @property(Label) kill : Label = null
    @property(Label) coin : Label = null
    @property(Sprite) crown : Sprite = null
    protected start(): void {
        this.nameString.string = MainGameManager.instance.dataPlayerManager.getUsername();
        this.rank.string = ResultManager.instance.currentRank.toString()
        this.kill.string = ResultManager.instance.currentKill.toString()
        this.showCrown(ResultManager.instance.currentRank)
        var x =  MainGameManager.instance.dataPlayerManager.getPlayerHighestScore()
        var highestScore = x < ResultManager.instance.currentKill ? ResultManager.instance.currentKill : x
        MainGameManager.instance.dataPlayerManager.setPlayerHighestScore(highestScore)
    }

    private onClickRematch(){
        MainGameManager.instance.popupManager.showPopup(PopupType.MATCHING);
    }

    showCrown(rank : number)
    {
        switch (rank) {
            case 1:
                this.crown.spriteFrame = this.crown.spriteAtlas.getSpriteFrame("Crown")
                this.coin.string = "   x50"
                //MainGameManager.instance.dataPlayerManager.
                break;
            case 2:
                this.crown.spriteFrame = this.crown.spriteAtlas.getSpriteFrame("Crown gray")
                this.coin.string = "   x30"
                break;
            default:
                this.crown.spriteFrame = null
                this.coin.string = "   x10"
                break;
        }
    }

}

