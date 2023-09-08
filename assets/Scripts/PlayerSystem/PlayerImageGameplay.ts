import { Component, Vec3,Node, _decorator, sp, instantiate } from "cc";
import { MainGameManager } from "../Game/Manager/MainGameManager";

const {ccclass,property} =_decorator
@ccclass('PlayerImageGamePlay')
export class PlayerImageGamePlay extends Component
{
    @property(sp.Skeleton) render : sp.Skeleton = null
    @property(Node) mouth : Node
    protected onLoad(): void {
        //InfomationSync.getInstance().onChangeFishEvent.on(this.changeFishUI,this);
        var id = MainGameManager.instance.dataPlayerManager.getEquipedFish()
        this.changeFishUI(id)
        this.setPos(id)
    }
    private changeFishUI(id: string){
        const data = MainGameManager.instance.spineManager.getSpineDataFromId(`UI${id}`);
        let playerUI = instantiate(data);
        this.render.skeletonData = playerUI.getComponent(sp.Skeleton).skeletonData
        playerUI.active = false
        this.render.addAnimation(0,"idle",true)
        // let accessorySlot = playerUI.getComponentInChildren(AccessorySlot);
        // if(!accessorySlot){
        //     playerUI.getChildByName("AccessorySlot").addComponent(AccessorySlot);
        // };
        // let curHat = MainGameManager.instance.dataPlayerManager.getEquipedHat();
        // accessorySlot.SetAccessory(curHat)
        // this.playerPanel.addChild(playerUI);
        // playerUI.setPosition(0,0,0)
    }

    setPos(id: string)
    {
        var poss = fishPositionConfig.get(id)
        this.render.node.setPosition(poss[0])
        this.mouth.setPosition(poss[1])
    }
}
export const fishPositionConfig : Map<string,Vec3[]> = new Map([
    ["Fish_1",[new Vec3(-6,17,0),new Vec3(-44,55,0)]],
    ["Fish_2",[new Vec3(-6,-5,0),new Vec3(-32,35,0)]],
    ["Fish_6",[new Vec3(-6,20,0),new Vec3(-68,35,0)]],
    ["Fish_9",[new Vec3(0,20,0),new Vec3(-71,53,0)]],
    ["Fish_10",[new Vec3(0,20,0),new Vec3(-64,23,0)]],
    ["Fish_14",[new Vec3(0,4,0),new Vec3(-75,32,0)]],
    ["Fish_16",[new Vec3(0,25,0),new Vec3(-60,50,0)]],

]);