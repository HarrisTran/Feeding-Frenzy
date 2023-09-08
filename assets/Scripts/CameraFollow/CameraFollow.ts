import { _decorator, CCFloat, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraFollow')
export class CameraFollow extends Component {
    
    @property({type : CCFloat}) private speed : number = 0.005


    public followTarget(xTarget : number, yTarget: number)
    {
        var targetPosition = new Vec3(xTarget,yTarget,this.node.position.z)
        var currentPosition = this.node.position

        currentPosition.lerp(targetPosition,this.speed)

        this.node.setPosition(currentPosition)
    }
}


