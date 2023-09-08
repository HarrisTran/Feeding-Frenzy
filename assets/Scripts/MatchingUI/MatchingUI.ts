import { _decorator, CCString, Component, director, JsonAsset, Label, Node, randomRangeInt, Sprite, tween } from 'cc';
import { Tag } from './Tag';
import { NameStatic } from './NameStatic';
const { ccclass, property } = _decorator;

@ccclass('MatchingUI')
export class MatchingUI extends Component {
    @property(Sprite) energyLoading: Sprite = null;
    @property([Tag]) tags: Tag[] = []; 
    @property(JsonAsset) nameSample: JsonAsset = null;
    private names : string[] = []
    protected onLoad(): void {
        this.names = this.nameSample.json.sample as string[];
        this.energyLoading.fillRange = 0;

        for(var i = 0; i< this.names.length-2; i++)
        {
            const j = randomRangeInt(i+1, this.names.length-1);
            [this.names[i],this.names[j]] = [this.names[j],this.names[i]];
        }
        this.tags.forEach((tag,index) => {
            tag.getComponentInChildren(Label).string = this.names[index];
        })

        if(NameStatic.getInstance() == null)
        {
            const names = new NameStatic()
        }
 
        NameStatic.getInstance()?.setListNames(this.names)
    }

    start() {
        tween(this.energyLoading)
        .to(10,{fillRange : 1},
            {
                onComplete: () => {
                    director.loadScene("GameScene")
                }
            })
            .start();
    }
}

