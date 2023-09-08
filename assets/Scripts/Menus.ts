import { _decorator, Component, director, find, instantiate, Label, log, Node, Prefab, sp, Sprite } from 'cc';
import { PopupType } from '../Services/PopupSystem/PopupType';
import { MainGameManager } from './Game/Manager/MainGameManager';
import { InfomationSync, SyncDataEvent } from './Common/InfomationSync';
import { SpineManager } from './Game/Manager/SpineManager';
import { AccessorySlot } from './FishManager/AccessorySlot';
import { ResultManager } from './Common/ResultManager';
const { ccclass, property } = _decorator;

@ccclass('Menu')
export class Menu extends Component {
    @property(Node) playerPanel : Node = null;
    @property(Label) nameString: Label = null;
    @property(Sprite) avatarSprite : Sprite = null;
    @property(Label) nameTag: Label = null;
    @property(Label) goldString : Label = null;

    protected onLoad(): void {
        InfomationSync.getInstance().onChangeNameEvent.on(SyncDataEvent.EVENT_UPDATE_NAME,this.changeNameUI, this);
        InfomationSync.getInstance().onChangeFishEvent.on(SyncDataEvent.EVENT_UPDATE_FISH,this.changeFishUI,this);
        InfomationSync.getInstance().onChangeHatEvent.on(SyncDataEvent.EVENT_UPDATE_HAT,this.changeHatUI,this);
        InfomationSync.getInstance().onChangeAvatarEvent.on(SyncDataEvent.EVENT_UPDATE_AVATAR,this.changeAvatar,this);
    }

    protected start(): void {
        const data = MainGameManager.instance.dataPlayerManager;
        const  resul = new ResultManager()

        const username = data.getUsername();
        const gold = data.getGold();
        const avatar = data.avatar;

        this.changeNameUI(username);
        this.changeGoldUI(gold);
        this.avatarSprite.spriteFrame = MainGameManager.instance.avatarSpriteMap.get(avatar);
    }

    private changeNameUI(name: string) {
        this.nameString.string = name;
        this.nameTag.string = name;
    }

    private changeAvatar(id: string){
        this.avatarSprite.spriteFrame = MainGameManager.instance.avatarSpriteMap.get(id);
    }

    private changeGoldUI(gold: number) {
        this.goldString.string = gold.toString();
    }

    private changeFishUI(id: string){
        const data = MainGameManager.instance.spineManager.getSpineDataFromId(`UI${id}`);
        let playerUI = instantiate(data);
        this.playerPanel.removeAllChildren();
        let accessorySlot = playerUI.getComponentInChildren(AccessorySlot);
        accessorySlot.SetAccessory(MainGameManager.instance.dataPlayerManager.getEquipedHat());
        this.playerPanel.addChild(playerUI);
        playerUI.setPosition(0,0,0);
    }

    private changeHatUI(id: string){
        this.playerPanel.children[0].getComponentInChildren(AccessorySlot).SetAccessory(id);
    }

    enterMapScene(){
        director.loadScene("Map");
    }

    enterShopScene(){
        director.loadScene("Shop");
    }

    protected onDestroy(): void {
        InfomationSync.getInstance().onChangeNameEvent.off(SyncDataEvent.EVENT_UPDATE_NAME,this.changeNameUI, this);
        InfomationSync.getInstance().onChangeAvatarEvent.off(SyncDataEvent.EVENT_UPDATE_AVATAR,this.changeAvatar,this);
        InfomationSync.getInstance().onChangeFishEvent.off(SyncDataEvent.EVENT_UPDATE_FISH,this.changeFishUI,this);
        InfomationSync.getInstance().onChangeHatEvent.off(SyncDataEvent.EVENT_UPDATE_HAT,this.changeHatUI,this);
    }
}

