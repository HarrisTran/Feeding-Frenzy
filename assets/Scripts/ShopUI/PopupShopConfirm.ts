import { _decorator, Component, log, Node } from 'cc';
import { PopupBase } from '../../Services/PopupSystem/PopupBase';
import { MainGameManager } from '../Game/Manager/MainGameManager';
const { ccclass, property } = _decorator;

@ccclass('PopupShopConfirm')
export class PopupShopConfirm extends PopupBase {
    internalId: string;
    price: number;

    setup(id: string, price: number){
        this.internalId = id;
        this.price = price;
    }

    onConfirmButton(){
        
        if(this.internalId.startsWith("Hat_")){
            MainGameManager.instance.dataPlayerManager.addNewHatToInventory(this.internalId);
        }
        if(this.internalId.startsWith("Fish_")){
            MainGameManager.instance.dataPlayerManager.addNewFishToInventory(this.internalId);
        }

        MainGameManager.instance.dataPlayerManager.subtractGold(this.price);
    }
}

