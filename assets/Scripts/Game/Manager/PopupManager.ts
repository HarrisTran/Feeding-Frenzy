import { _decorator, Component, director, Node, RenderingSubMesh } from 'cc';
import { PopupBase } from '../../../Services/PopupSystem/PopupBase';
import { PopupType } from '../../../Services/PopupSystem/PopupType';
import { Game } from '../../Game';
const { ccclass, property } = _decorator;

@ccclass('PopupManager')
export class PopupManager extends Component {

    @property(PopupBase) private popups: PopupBase[] = [];

    private _popupMap: Map<string,PopupBase>;

    public setup(){
        this._popupMap = new Map<string,PopupBase>();
        for(let popup of this.popups)
        {
            this._popupMap.set(popup.getPopupCode(),popup);
            popup.hideImmediately();
        }
    }

    public getPopup(type: PopupType){
        return this.popups.find(z => z.Type == type);
    }

    public showPopup(type : PopupType)
    {
        if(type === PopupType.VICTORY || type === PopupType.LOSE){
            Game.Instance.pauseGame();
        }
        this.popups.find(x => x.Type == type).show()
    }

    public hidePopup(type: PopupType)
    {
        this.popups.find(x => x.Type == type).hide();
    }

    protected onLoad(): void {
        this.setup();
    }

}

