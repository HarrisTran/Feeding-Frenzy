import { _decorator, Component, log, Node, NodePool, Prefab, settings, Vec3 } from 'cc';
import { Fish } from './Fish';
import { ObjectPool } from './ObjectPool';
import { EventSystem } from '../../Services/EventSystem/EventSystem';
import { FishType } from '../Unit/FishType';
import { FishSettings } from '../Setting/GameSetting';
const { ccclass, property } = _decorator;

@ccclass('FishSpawner')
export class FishSpawner extends Component {
    @property(Prefab)   private fishes : Prefab[] = [];

    private fishAddedEvent: EventSystem<Fish> = new EventSystem<Fish>();
    private fishRemovedEvent: EventSystem<Fish> = new EventSystem<Fish>();

    private fishTypetoPool = new Map<string,ObjectPool<Fish>>();
    private idToSettings = new Map<string,FishSettings>();

    public init(fishesSettings: FishSettings[]) : void 
    {
        for(const fish of this.fishes)
        {
            const fishPool : ObjectPool<Fish> = new ObjectPool(fish,this.node,3,"Fish");
            this.fishTypetoPool.set(fish.name, fishPool);
        }

        for(const fishSetting of fishesSettings)
        {
            this.idToSettings.set(fishSetting.id, fishSetting);
        }
        
    }

    public spawnNewFish(positionX: number, positionY: number, id: string) : Fish
    {
        // if(!this.idToSettings.has(id)) 
        // {
        //     throw new Error("Does not have setting for fish" + id);
        // }

        // const fishSettings = this.idToSettings.get(id);
        // const fish = this.fishTypetoPool.get(fishSettings.id).borrow();
        // const spawnPosition = new Vec3();

        // spawnPosition.x = positionX;
        // spawnPosition.y = positionY;

        // fish.setup(spawnPosition,fishSettings);

        // fish.AteEvent.on(this.returnFish,this);

        // this.fishAddedEvent.emit(fish);

        return null;
    }

    public get FishAddedEvent(): EventSystem<Fish>
    {
        return this.fishAddedEvent;
    }

    public get FishRemovedEvent() : EventSystem<Fish>
    {
        return this.fishRemovedEvent;
    }

}