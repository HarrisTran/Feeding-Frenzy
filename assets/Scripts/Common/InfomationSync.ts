import { _decorator, Component, EventTarget, log, Node } from 'cc';
import { EventSystem } from '../../Services/EventSystem/EventSystem';
const { ccclass, property } = _decorator;
export enum SyncDataEvent
{
    EVENT_UPDATE_NAME = "EVENT_UPDATE_NAME",
    EVENT_UPDATE_AVATAR = "EVENT_UPDATE_AVATAR",
    EVENT_UPDATE_GOLD = "EVENT_UPDATE_GOLD",
    EVENT_UPDATE_FISH = "EVENT_UPDATE_FISH",
    EVENT_UPDATE_HAT = "EVENT_UPDATE_HAT",
}
@ccclass('InfomationSync')
export class InfomationSync extends Component {
    private static instance : InfomationSync;
    public onChangeNameEvent: EventTarget = new EventTarget();
    public onChangeAvatarEvent: EventTarget = new EventTarget();
    public onChangeGoldEvent: EventTarget = new EventTarget();
    public onChangeFishEvent: EventTarget = new EventTarget();
    public onChangeHatEvent: EventTarget = new EventTarget();

    protected onLoad(): void {
        InfomationSync.instance = this;
    }

    public static getInstance(){
        return this.instance;
    }

    triggleChangeName(name: string){
        this.onChangeNameEvent.emit(SyncDataEvent.EVENT_UPDATE_NAME,name);
    }

    triggleChangeAvatar(id: string){
        this.onChangeAvatarEvent.emit(SyncDataEvent.EVENT_UPDATE_AVATAR,id);
    }

    triggleChangeGold(gold: number){
        this.onChangeGoldEvent.emit(SyncDataEvent.EVENT_UPDATE_GOLD,gold);
    }

    triggleChangeFish(id : string){
        this.onChangeFishEvent.emit(SyncDataEvent.EVENT_UPDATE_FISH,id);
    }

    triggleChangeHat(id: string){
        this.onChangeHatEvent.emit(SyncDataEvent.EVENT_UPDATE_HAT,id);
    }


}

