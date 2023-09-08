import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Loading')
export class Loading extends Component {
    protected start(): void {
        this.unscheduleAllCallbacks();
        setTimeout(() => {
            director.loadScene("Menu");
        }, 1000);
    }
}

