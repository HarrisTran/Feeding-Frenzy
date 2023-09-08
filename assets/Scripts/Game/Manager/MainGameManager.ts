import { _decorator, Component, director, Node, resources, sp, SpriteAtlas, SpriteFrame } from 'cc';
import { PopupManager } from './PopupManager';
import { AudioManager } from '../../../Services/AudioSystem/AudioManager';
import { DataPlayerManager } from './DataPlayerManager';
import { ShopManager } from './ShopManager';
import { SpineManager } from './SpineManager';
const { ccclass, property } = _decorator;

@ccclass('MainGameManager')
export class MainGameManager extends Component {
    private static _instance: MainGameManager;

    @property({group: {name: "Manager", id: "1", displayOrder: 1}, type: PopupManager})
    public popupManager: PopupManager;

    @property({group: {name: "Manager", id: "1", displayOrder: 1}, type: AudioManager})
    public audioManager: AudioManager;

    @property({group: {name: "Manager", id: "1", displayOrder: 1}, type: DataPlayerManager})
    public dataPlayerManager: DataPlayerManager;

    @property({group: {name: "Manager", id: "1", displayOrder: 1}, type: ShopManager})
    public shopManager: ShopManager;

    @property({group: {name: "Manager", id: "1", displayOrder: 1}, type: SpineManager})
    public spineManager: SpineManager;

    avatarSpriteMap: Map<string, SpriteFrame> = null;
    fishSpineMap: Map<string,sp.SkeletonData> = null;

    private readonly _avatarSpritePath = "Avatar/avatar";
    private readonly _fishSpinePath = "";

	public static get instance(): MainGameManager
	{
		return this._instance;
	}

    protected onLoad(): void {
        this.setup();
        MainGameManager._instance = this;
        director.addPersistRootNode(this.node);
    }

    private setup(){
        resources.load(this._avatarSpritePath,SpriteAtlas,(err,data)=>{
            if(err)
            {
                throw err;
            }

            this.avatarSpriteMap = new Map<string,SpriteFrame>();

            for(let sprite of data.getSpriteFrames()){
                let name = sprite.name;
                this.avatarSpriteMap.set(name,sprite);
            }
        })

        resources.load
    }
}

