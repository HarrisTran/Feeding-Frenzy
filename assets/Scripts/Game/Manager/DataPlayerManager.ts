import { _decorator, Component, error, JsonAsset, log, Node, resources, Skeleton, sys, warn } from 'cc';
import { MainGameManager } from './MainGameManager';
import { EventSystem } from '../../../Services/EventSystem/EventSystem';
import { InfomationSync } from '../../Common/InfomationSync';
const { ccclass, property } = _decorator;

export class DataPlayer {
    username: string;
    userNote: string;
    avatar: string;
    inventoryHats: Object[];
    fishCollection: Object[];
    bgIndex: number;
    gold: number;
    lastModifiedDate: Date;

    equipedHat: string;
    equipedFish: string;
};

@ccclass('DataPlayerManager')
export class DataPlayerManager extends Component {
    private static readonly PLAYER_DATA_KEY = "playerData";
    private static readonly PLAYER_HIGHEST_SCORE = "playerHighestScore";
    
    private _dataPlayer: DataPlayer = null;
    private _newDataPlayer: DataPlayer = null;
    private _username: string;
    private _userNote: string;
    public avatar: string;
    private _inventoryHats: Map<string,Object>;
    private _fishCollection: Map<string,Object>;
    private _bgIndex: number;
    private _gold: number;
    private _equipedHat: string;
    private _equipedFish: string;

    protected onLoad(): void {
        this.setup();
    }

    public saveDataToDisk(){
        this._dataPlayer.username = this._username;
        this._dataPlayer.userNote = this._userNote;
        this._dataPlayer.avatar = this.avatar;
        this._dataPlayer.inventoryHats = [...this._inventoryHats.values()];
        this._dataPlayer.fishCollection = [...this._fishCollection.values()];
        this._dataPlayer.bgIndex = this._bgIndex;
        this._dataPlayer.gold = this._gold;
        this._dataPlayer.lastModifiedDate = new Date();
        this._dataPlayer.equipedHat = this._equipedHat;
        this._dataPlayer.equipedFish = this._equipedFish;

        log("After change ",this._dataPlayer);
        let dataString  = JSON.stringify(this._dataPlayer);
        sys.localStorage.setItem(DataPlayerManager.PLAYER_DATA_KEY,dataString);
    }

    public setBgIndex(bgIndex: number){
        this._bgIndex = bgIndex;
        this.saveDataToDisk();
    }

    public setUsername(s: string){
        this._username = s;
        this.saveDataToDisk();
        InfomationSync.getInstance().triggleChangeName(this._username);
    }

    public setUserNote(s: string){
        this._userNote = s;
        this.saveDataToDisk();
    }

    public subtractGold(g : number){
        this._gold -= g;
        this.saveDataToDisk();
        InfomationSync.getInstance().triggleChangeGold(this._gold);
    }

    public setEquipedHat(name: string)
    {
        this._equipedHat = name;
        this.saveDataToDisk();
        InfomationSync.getInstance().triggleChangeHat(this._equipedHat)
    }

    public setEquipedFish(name: string){
        this._equipedFish = name;
        this.saveDataToDisk();
        InfomationSync.getInstance().triggleChangeFish(this._equipedFish);
    }

    public getBgIndex(){
        return this._dataPlayer.bgIndex;
    }

    public getUsername(){
        return this._username;
    }

    public getUserNote(){
        return this._userNote;
    }

    public getGold(){
        return this._gold;
    }

    public getInventoryHatsId(){
        return [...this._inventoryHats.keys()];
    }

    public playerHasHat(id: string){
        return this._inventoryHats.has(id);
    }

    public inventoryHatIsEmpty(){
        return this._inventoryHats.size == 0;
    }

    public getFishCollection(){
        return [...this._fishCollection.keys()];
    }

    public playerHasFish(id: string){
        return this._fishCollection.has(id);
    }

    public getEquipedHat() : string
    {
        return this._equipedHat;
    }

    public getEquipedFish(): string
    {
        return this._equipedFish;
    }

    public addNewHatToInventory(id: string) : boolean{
        if(this._inventoryHats.has(id)){
            return false;
        }else{
            const hat = MainGameManager.instance.shopManager.hatList.get(id);
            this._inventoryHats.set(id,{"id": id});
            return true;
        }
    }


    public addNewFishToInventory(id: string) : boolean{
        if(this._fishCollection.has(id)){
            return false;
        }else{
            const fish = MainGameManager.instance.shopManager.fishList.get(id);
            this._fishCollection.set(id,{"id": id});
            return true;
        }
    }

    private setup(){
        let dataString = sys.localStorage.getItem(DataPlayerManager.PLAYER_DATA_KEY);
        
        if(dataString === null || dataString === undefined){
            resources.load("new_data_profile", JsonAsset, (err, assets) => {
                if (err) {
                    error(err);
                }
                else {
                    this.convertJsonToData(assets.json);
                    this._dataPlayer = null;
                    this.createNewProfile();
                    sys.localStorage.setItem(DataPlayerManager.PLAYER_DATA_KEY,JSON.stringify(this._dataPlayer));
                }
            })
        }else{
            let data = JSON.parse(dataString);
            this._dataPlayer = data;

            this._username = this._dataPlayer.username ? this._dataPlayer.username : "user0";
            this._userNote = this._dataPlayer.userNote ? this._dataPlayer.userNote : "";
            this.avatar = this._dataPlayer.avatar ? this._dataPlayer.avatar : "avatar_0";
            this._inventoryHats = new Map<string, Object>();
            this._dataPlayer.inventoryHats.forEach((f) => {
                this._inventoryHats.set(f["id"], f);
            })
            this._fishCollection = new Map<string, Object>();
            this._dataPlayer.fishCollection.forEach((f) => {
                this._fishCollection.set(f["id"], f);
            })
            this._bgIndex = this._dataPlayer.bgIndex ? this._dataPlayer.bgIndex : 0;
            this._gold = this._dataPlayer.gold ? this._dataPlayer.gold : 0;
            this._equipedHat = this._dataPlayer.equipedHat ? this._dataPlayer.equipedHat : "Hat_0";
            this._equipedFish = this._dataPlayer.equipedFish ? this._dataPlayer.equipedFish : "Fish_1";
        }
        
    }

    public createNewProfile(){
        this._dataPlayer = JSON.parse(JSON.stringify(this._newDataPlayer)); // a deep clone
        this._username = this._dataPlayer.username;
        this._userNote = this._dataPlayer.userNote;
        this.avatar = this._dataPlayer.avatar;
        this._inventoryHats = new Map<string,Object>();
        this._dataPlayer.inventoryHats.forEach((f)=>{
            this._inventoryHats.set(f["id"],f);
        })
        this._fishCollection = new Map<string,Object>();
        this._dataPlayer.fishCollection.forEach((f)=>{
            this._fishCollection.set(f["id"],f);
        })
        this._bgIndex = this._dataPlayer.bgIndex;
        this._gold = this._dataPlayer.gold;
        this._equipedHat = this._dataPlayer.equipedHat;
        this._equipedFish = this._dataPlayer.equipedFish;
    }

    private convertJsonToData(rec: Record<string,any>){
        this._newDataPlayer = new DataPlayer();
        this._newDataPlayer.username = rec["username"];
        this._newDataPlayer.userNote = rec["userNote"];
        this._newDataPlayer.avatar = rec["avatar"];
        this._newDataPlayer.gold = rec["gold"];
        this._newDataPlayer.bgIndex = rec["bgIndex"];
        this._newDataPlayer.inventoryHats = rec["inventoryHats"] as Object[];
        this._newDataPlayer.fishCollection = rec["fishCollection"] as Object[];
        this._newDataPlayer.equipedHat = rec["equipedHat"] ? rec["equipedHat"] : "None";
        this._newDataPlayer.equipedFish = rec["equipedFish"] ? rec["equipedFish"] : "None";
        this._newDataPlayer.lastModifiedDate = new Date();
    }

    public getPlayerHighestScore(): number
    {
        let value = sys.localStorage.getItem(DataPlayerManager.PLAYER_HIGHEST_SCORE);
        if (value === null)
        {
            sys.localStorage.setItem(DataPlayerManager.PLAYER_HIGHEST_SCORE, "0");
            return 0;
        }
        else
        {
            let intValue = parseInt(value);

            if (isNaN(intValue))
            {
                sys.localStorage.setItem(DataPlayerManager.PLAYER_HIGHEST_SCORE, "0");
                return 0;
            }
            else
            {
                return intValue;
            }
        }
    }

    public setPlayerHighestScore(value: number)
    {
        sys.localStorage.setItem(DataPlayerManager.PLAYER_HIGHEST_SCORE, value.toString());
    }
}

