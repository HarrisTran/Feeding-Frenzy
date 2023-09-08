import { _decorator, CCString, Component, director, Enum, Node } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('SceneController')
export class SceneController extends Component {

    @property({type : CCString}) public sceneName : string;

    protected onLoad(): void {
        this.node.on('click',()=>{
            director.loadScene(this.sceneName);
        })
    }
}

