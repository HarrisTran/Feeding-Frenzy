import { _decorator, Component, instantiate, log, Node, Prefab, Sprite, Toggle, ToggleContainer } from 'cc';
import { PopupBase } from '../../../Services/PopupSystem/PopupBase';
import { MainGameManager } from '../../Game/Manager/MainGameManager';
const { ccclass, property } = _decorator;

@ccclass('PopupFishTank')
export class PopupFishTank extends PopupBase {
    @property(Node) layout: Node = null;

    @property(Prefab) fishTank: Prefab = null;

    protected onLoad(): void {
        super.onLoad();
        this.initializePrefab();
    }

    initializePrefab(){
        const idIterator = MainGameManager.instance.dataPlayerManager.getFishCollection();
        this.layout.removeAllChildren();
        for(const value of idIterator){
            let fishTank = instantiate(this.fishTank);
            fishTank.on('click',()=>{
                MainGameManager.instance.dataPlayerManager.setEquipedFish(value);
            });
            fishTank.getChildByName("EquipButton").on('click',()=>{
                MainGameManager.instance.dataPlayerManager.setEquipedFish(value);
                fishTank.getComponent(Toggle).isChecked = true;
            })
            let sprite = fishTank.getChildByName("Fish").getComponent(Sprite);
            sprite.spriteFrame = sprite.spriteAtlas.getSpriteFrame(value);
            this.layout.addChild(fishTank);
        }
    }

    protected onShowStart(): void {
        this.initializePrefab();
        const curFish = MainGameManager.instance.dataPlayerManager.getEquipedFish();
        this.layout.getComponent(ToggleContainer).toggleItems.forEach(i=>{
            if(i.getComponentInChildren(Sprite).spriteFrame.name === curFish){
                i.isChecked = true;
            }
        })
    }
    
    protected onShowEnd(): void {
        
    }

    protected onHideStart(): void {
        
    }

    protected onHideEnd(): void {
        
    }

}

