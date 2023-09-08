import { _decorator, Component, Node } from 'cc';
import { PopupType } from '../../Services/PopupSystem/PopupType';
import { MainGameManager } from '../Game/Manager/MainGameManager';
const { ccclass, property } = _decorator;

@ccclass('PopupButtonAdapter')
export class PopupButtonAdapter extends Component {
    @property({type : PopupType}) Type : PopupType;

    protected onLoad(): void {
        this.node.on('click',()=>{
            MainGameManager.instance.popupManager.showPopup(this.Type);
        })
    }
}

