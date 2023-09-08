import { _decorator, Button, Color, color, Component, EventHandler, Label, log, Node, Sprite, SpriteFrame } from 'cc';
import { MainGameManager } from '../Game/Manager/MainGameManager';
import { PopupType } from '../../Services/PopupSystem/PopupType';
import { PopupShopConfirm } from './PopupShopConfirm';
const { ccclass, property } = _decorator;

@ccclass('ItemShop')
export class ItemShop extends Component {
    @property(Node) spriteNode : Node = null;
    @property(Node) priceNode : Node = null;

    @property(SpriteFrame) greenButton: SpriteFrame = null;
    @property(SpriteFrame) brownButton: SpriteFrame = null;


    private id: string ;
    private price: number;

    private stateButton: string;

    public initialize(id: string, price: number){
        this.id = id;
        this.price = price;
        let itemSprite = this.spriteNode.getComponent(Sprite);
        itemSprite.spriteFrame = itemSprite.spriteAtlas.getSpriteFrame(id);

        let itemPrice = this.priceNode.getComponentInChildren(Label);
        itemPrice.string = price.toString();
    }

    buy(){
        let popup = MainGameManager.instance.popupManager.getPopup(PopupType.SHOP_CONFIRM) as PopupShopConfirm;
        popup.setup(this.id,this.price);
    }

    protected update(dt: number): void {
        const gold = MainGameManager.instance.dataPlayerManager.getGold();
        if(gold >= this.price){
            this.stateButton = "active";
        }else{
            this.stateButton = "non-active";
        }

        if(this.id.startsWith("Hat_")){
            if(MainGameManager.instance.dataPlayerManager.playerHasHat(this.id)){
                this.stateButton = "owned";
            }
        }

        if(this.id.startsWith("Fish_")){
            if(MainGameManager.instance.dataPlayerManager.playerHasFish(this.id)){
                this.stateButton = "owned";
            }
        }

        this.setStateButton();
    }

    private setStateButton(){
        this.priceNode.active = true;
        this.node.getComponent(Sprite).color = new Color(255,255,255,255);
        switch (this.stateButton) {
            case "active":
                this.priceNode.getComponent(Sprite).spriteFrame = this.greenButton;
                this.priceNode.getComponent(Button).interactable = true;
                break;
            case "non-active":
                this.priceNode.getComponent(Sprite).spriteFrame = this.brownButton;
                this.priceNode.getComponent(Button).interactable = false;
                this.node.getComponent(Sprite).color = new Color(150,150,150,255);
                break;
            case "owned":
                this.priceNode.active = false;
                break;
            default:
                break;
        }
    }


}

