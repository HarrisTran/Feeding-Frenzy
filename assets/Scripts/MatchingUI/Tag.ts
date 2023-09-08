import { _decorator, Component, log, Node, Sprite, tween } from 'cc';
import { random } from '../Common/Utils';
const { ccclass, property } = _decorator;

@ccclass('Tag')
export class Tag extends Component {
    @property(Sprite) private progressSprite : Sprite;
    @property(Node) greenDot: Node ;

    public loadingDone : boolean = false;

    protected onLoad(): void {
        this.progressSprite.fillRange = 0;
    }

    playLoading(){
        this.progressSprite.fillRange = 0;
        tween(this.progressSprite)
        .to(random(3,5),{fillRange : 1},{onComplete: () => {
            this.greenDot.active = true;
        }})
        .start();
    }

}

