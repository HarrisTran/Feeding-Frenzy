import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, log, Node } from 'cc';
import { GroupType } from '../Game/GroupType';
import { Fish } from '../Common/Fish';
const { ccclass, property } = _decorator;

@ccclass('Boundary')
export class Boundary extends Component {

    @property(BoxCollider2D)
    private boundary: BoxCollider2D = null;

    protected onLoad(): void {
        this.boundary.on(Contact2DType.BEGIN_CONTACT,this.onTouchBoundary,this)
    }

    private onTouchBoundary(_selfCollider: Collider2D, otherCollider: Collider2D)
    {
        var x= otherCollider.getComponent(Fish)
        if(x)
        {
            x.wasEte()
        }
    }
}

