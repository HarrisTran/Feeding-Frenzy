import { _decorator, CCString, Component, log, Node, Prefab, sp } from 'cc';
import { SkeletonInstance } from '../../FishManager/SkeletonInstance';
const { ccclass, property } = _decorator;

@ccclass('SpineManager')
export class SpineManager extends Component {

    @property([Prefab]) private fishSkeletonPrefabs : Prefab[] = [];

    private _animationMap: Map<string,Prefab>;

    protected onLoad(): void {
        this.setup();
    }

    private setup(){
        this._animationMap = new Map<string,Prefab>();
        for(let spine of this.fishSkeletonPrefabs)
        {
            this._animationMap.set(spine.name,spine);
        }

    }

    public getSpineDataFromId(id: string) : Prefab{
        return this._animationMap.get(id);
    }
}

