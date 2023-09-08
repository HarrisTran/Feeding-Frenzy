import { _decorator, Component, instantiate, log, Node, randomRangeInt } from 'cc';
import { PopupBase } from '../../../Services/PopupSystem/PopupBase';
import { MainGameManager } from '../../Game/Manager/MainGameManager';
const { ccclass, property } = _decorator;

@ccclass('PopupUnlock')
export class PopupUnlock extends PopupBase {
    @property(Node) playerPanel : Node = null;

    private bonusString : string = "";

    protected onShowStart()
    {
        let allFish = MainGameManager.instance.shopManager.getAllFishAvailable();
        let allFishPlayerHas = MainGameManager.instance.dataPlayerManager.getFishCollection();
        let excluseList = allFish.filter(el => {
            return allFishPlayerHas.indexOf(el) < 0
        });
        let length = excluseList.length;
        if(length <= 0) return;
        let k = randomRangeInt(0,length);
        let randomSome = excluseList[k];
        const data = MainGameManager.instance.spineManager.getSpineDataFromId(`UI${randomSome}`);
        let playerUI = instantiate(data);
        this.playerPanel.removeAllChildren();
        this.playerPanel.addChild(playerUI);
        playerUI.setPosition(0,0,0);

        this.bonusString = randomSome;
    }
    
    protected onShowEnd()
    {
        
    }

    protected onHideStart()
    {
        MainGameManager.instance.dataPlayerManager.addNewFishToInventory(this.bonusString);
    }

    protected onHideEnd()
    {
        
    }
}

