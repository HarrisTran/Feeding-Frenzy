import { _decorator, Component, instantiate, log, Node, sp } from 'cc';
import { InfomationSync } from '../Common/InfomationSync';
import { MainGameManager } from '../Game/Manager/MainGameManager';
import { AccessorySlot } from '../FishManager/AccessorySlot';
const { ccclass, property } = _decorator;

@ccclass('PlayerImage')
export class PlayerImage extends Component {

    protected onLoad(): void {
        this.changeFishUI(MainGameManager.instance.dataPlayerManager.getEquipedFish());
    }
    public changeFishUI(id: string){
        let playerUI = instantiate(MainGameManager.instance.spineManager.getSpineDataFromId(`UI${id}`));
        this.node.removeAllChildren();
        let accessorySlot = playerUI.getComponentInChildren(AccessorySlot);

        accessorySlot.SetAccessory(MainGameManager.instance.dataPlayerManager.getEquipedHat())
        this.node.addChild(playerUI);
        playerUI.setPosition(0,0,0)
    }
}

