import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Direction')
export class Direction extends Component {

    @property(Node) a: Node;

    update(deltaTime: number) {
        this.node.eulerAngles = this.a.eulerAngles
    }
}

