import { _decorator, Component, error, JsonAsset, log, Node, resources } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ShopManager')
export class ShopManager extends Component {
    private static readonly SHOP_DATA_KEY = "shopData";

    private _fishList: Map<string,Object>;
    private _hatList: Map<string,Object>;

    protected onLoad(): void {
        this.setup();
    }

    private setup(){
        resources.load("GameSettings",JsonAsset,(err, assets) => {
            if(err){
                error(err);
            }
            else{
                this.convertJsonToData(assets.json);
            }
        })
    }

    
    public get fishList() {
        return this._fishList;
    }
    
    public get hatList(){
        return this._hatList;
    }
    

    private convertJsonToData(rec: Record<string,any>){
        let data = rec["storeManager"];
        this._fishList = new Map<string,Object>;
        data.fishes.forEach((f) => {
            this._fishList.set(f["id"],f);
        });
        this._hatList = new Map<string,Object>;
        data.hats.forEach((f) => {
            this._hatList.set(f["id"],f);
        });
    }

    public getAllFishAvailable(){
        return Array.from(this._fishList.keys());
    }

    public getAllHatAvailable(){
        return Array.from(this._hatList.keys());
    }
}

