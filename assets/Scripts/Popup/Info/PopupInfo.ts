import { _decorator, Button, Component, director, EditBox, find, Game, game, instantiate, Label, log, Node, Prefab, Sprite, Toggle, tween, UITransform, Vec2, Vec3 } from 'cc';
import { PopupBase } from '../../../Services/PopupSystem/PopupBase';
import { MainGameManager } from '../../Game/Manager/MainGameManager';
import { InfomationSync, SyncDataEvent } from '../../Common/InfomationSync';
const { ccclass, property } = _decorator;

@ccclass('PopupInfo')
export class PopupInfo extends PopupBase {
    @property(EditBox) username: EditBox = null;

    @property(EditBox) userNote: EditBox = null;

    @property(Node) avatarBoard: Node = null;

    @property(Sprite) avatarSprite: Sprite = null;

    @property(Prefab) avatarPrefab: Prefab = null;

    @property(Label) highestRecord: Label = null;

    private widthBoard: number;
    private usernameString: string;
    private userNoteString: string
    private avatarID: string;

    protected onLoad(): void {
        this.widthBoard = this.avatarBoard.getComponent(UITransform).contentSize.width;

        MainGameManager.instance.avatarSpriteMap.forEach(element => {
            let avatar = instantiate(this.avatarPrefab);
            avatar.getComponent(Sprite).spriteFrame = element;
            avatar.on('click',()=>{
                this.avatarID = element.name;
                this.avatarSprite.spriteFrame = element;
            })
            this.avatarBoard.getChildByName("Layout").addChild(avatar);
        });

        this.usernameString = MainGameManager.instance.dataPlayerManager.getUsername();
        this.avatarID = MainGameManager.instance.dataPlayerManager.avatar;
        this.userNoteString = MainGameManager.instance.dataPlayerManager.getUserNote();

        this.initialize();
    }

    private initialize(){
        this.username.string = this.usernameString;
        this.userNote.string = this.userNoteString;
        this.avatarSprite.spriteFrame = MainGameManager.instance.avatarSpriteMap.get(this.avatarID);
    }

    onOpenAvatarTab() {
        tween(this.avatarBoard)
            .to(1, { position: new Vec3(-this.widthBoard)}, {easing: "expoOut"}).start();
    }

    onCloseAvatarTab(){
        tween(this.avatarBoard)
            .to(0.4, { position: new Vec3(0) }, {easing : "expoOut"}).start();
    }

    protected onShowStart(): void {
       this.initialize();
       this.highestRecord.string = MainGameManager.instance.dataPlayerManager.getPlayerHighestScore().toString();
    }


    protected onHideStart(): void {
        this.onCloseAvatarTab();
        this.usernameString = this.username.string;
        this.userNoteString = this.userNote.string;
        InfomationSync.getInstance().onChangeAvatarEvent.emit(SyncDataEvent.EVENT_UPDATE_AVATAR,this.avatarID);
    }


    protected onHideEnd(): void {
        MainGameManager.instance.dataPlayerManager.setUserNote(this.userNote.string);
        MainGameManager.instance.dataPlayerManager.avatar = this.avatarID;
        MainGameManager.instance.dataPlayerManager.setUsername(this.usernameString);
    }
}

