import { _decorator, Component, find, instantiate, log, Node, Prefab, Sprite, ToggleContainer } from 'cc';
import { PopupBase } from '../../../Services/PopupSystem/PopupBase';
import { MainGameManager } from '../../Game/Manager/MainGameManager';
import { InventoryButton } from './InventoryButton';
import { AccessorySlot } from '../../FishManager/AccessorySlot';
const { ccclass, property } = _decorator;

@ccclass('PopupAccessories')
export class PopupAccessories extends PopupBase {
    @property(Node) layout: Node = null;

    @property(Prefab) inventoryBubble: Prefab = null;

    protected onLoad(): void {
        super.onLoad();
        this.initializePrefab();
    }

    private initializePrefab()
    {
        const idIterator = MainGameManager.instance.dataPlayerManager.getInventoryHatsId();
        this.layout.parent.getChildByName("Empty").active = MainGameManager.instance.dataPlayerManager.inventoryHatIsEmpty();
        this.layout.removeAllChildren();
        for(const value of idIterator){
            let hat = instantiate(this.inventoryBubble);

            let inv = hat.getComponent(InventoryButton);

            if (inv)
            {
                inv.clickCallback = () =>
                {
                    MainGameManager.instance.dataPlayerManager.setEquipedHat(value);
                };
            }

            let sprite = hat.getComponentInChildren(Sprite);
            sprite.spriteFrame = sprite.spriteAtlas.getSpriteFrame(value);
            this.layout.addChild(hat);
        }
    }

    protected onShowStart(): void {
        this.initializePrefab();
        let curHat = MainGameManager.instance.dataPlayerManager.getEquipedHat();
        // this.layout.getComponent(ToggleContainer).toggleItems.find(toggle=>{
        //     return toggle.node.getChildByName("Hat").getComponent(Sprite).spriteFrame.name === curHat;
        // }).isChecked = true;

        this.layout.getComponent(ToggleContainer).toggleItems.forEach(i=>{
            if(i.node.getChildByName("Hat").getComponent(Sprite).spriteFrame.name === curHat){
                i.isChecked = true;
            }
        })
    }
    
}

