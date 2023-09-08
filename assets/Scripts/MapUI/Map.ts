import { _decorator, Component, log, Node, NodeEventType, Toggle, ToggleContainer, UITransform } from 'cc';
import { BackGroundStatic } from '../Common/BackGroundStatic';
import { PopupManager } from '../Game/Manager/PopupManager';
import { PopupType } from '../../Services/PopupSystem/PopupType';
import { MainGameManager } from '../Game/Manager/MainGameManager';
const { ccclass, property } = _decorator;

@ccclass('Map')
export class Map extends Component {
    @property(ToggleContainer) background : ToggleContainer;
    private selected: number =0;

    checkMapEvent(){
        this.background.toggleItems.forEach((t,i)=> {
            if(t.isChecked)
            {
                this.selected = i;
            }
        })
    }

    onClickSelect(){
        MainGameManager.instance.dataPlayerManager.setBgIndex(this.selected);
    }
}

