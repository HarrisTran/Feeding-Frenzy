import { _decorator, Component, instantiate, Label, log, Node, PageView, Prefab, Sprite, ToggleContainer } from 'cc';
import { MainGameManager } from '../Game/Manager/MainGameManager';
import { ItemShop } from './ItemShop';
import { InfomationSync, SyncDataEvent } from '../Common/InfomationSync';
const { ccclass, property } = _decorator;

@ccclass('Shop')
export class Shop extends Component {
    @property(Label) nameString: Label = null;
    @property(Label) goldString : Label = null;
    @property(ToggleContainer) tagGroup : ToggleContainer = null;
    @property([PageView]) contentPageList: PageView[]  = [];
    

    @property(Prefab) bubble: Prefab = null;
    @property(Prefab) nilonBag : Prefab = null;

    protected onLoad(): void {
        InfomationSync.getInstance().onChangeGoldEvent.on(SyncDataEvent.EVENT_UPDATE_GOLD,this.changeGoldUI,this);
        this.initializePrefab();
    }

    protected start(): void {
        const data = MainGameManager.instance.dataPlayerManager
        const username = data.getUsername();
        const gold = data.getGold();

        this.nameString.string  = username;
        this.goldString.string = gold.toString();
    }

    private checkContentEvent(){
        this.tagGroup.toggleItems.forEach((t,i)=> {
            this.contentPageList[i].node.active = false;
            if(t.isChecked)
            {
                this.contentPageList[i].node.active = true;
            }
        })
    }

    private changeGoldUI(gold: number) {
        this.goldString.string = gold.toString();
    }

    private initializePrefab(){
        this.setupHatShop();
        this.setupFishShop();
    }

    private setupHatShop(){
        const bubbleList = [...MainGameManager.instance.shopManager.hatList].map(h => h[1] as any);
        const chunkSize = 6;
        const numberOfPage : number = Math.ceil(bubbleList.length/chunkSize);
        let pageTemplate : Node = this.contentPageList[0].content.getChildByName("page");
        this.contentPageList[0].content.removeAllChildren();
        for (let i = 0; i < numberOfPage; i++) {
            let newPage = instantiate(pageTemplate);
            bubbleList.slice(i*chunkSize,(i+1)*chunkSize).forEach(key => {
                let node = instantiate(this.bubble);
                node.getComponent(ItemShop).initialize(key.id,parseInt(key.price));
                newPage.addChild(node);
            })
            this.contentPageList[0].addPage(newPage);
        }
    }

    private setupFishShop(){
        const nilonBags = [...MainGameManager.instance.shopManager.fishList].map(f=>f[1] as any);
        const chunkSize = 6;
        const numberOfPage : number = Math.ceil(nilonBags.length/chunkSize);
        let pageTemplate : Node = this.contentPageList[1].content.getChildByName("page");
        this.contentPageList[1].content.removeAllChildren();
        for (let i = 0; i < numberOfPage; i++) {
            let newPage = instantiate(pageTemplate);
            nilonBags.slice(i*chunkSize,(i+1)*chunkSize).forEach(key => {
                let node = instantiate(this.nilonBag);
                node.getComponent(ItemShop).initialize(key.id,parseInt(key.price));
                newPage.addChild(node);
            })
            this.contentPageList[1].addPage(newPage);
        }
    }

    protected onDestroy(): void {
        InfomationSync.getInstance().onChangeGoldEvent.off(SyncDataEvent.EVENT_UPDATE_GOLD,this.changeGoldUI,this);
    }
}

