import { CCFloat, Component, _decorator, log } from "cc";
import { PlayerSize } from "./PlayerSize";
import { CameraSize } from "../../CameraFollow/CameraSize";
import { CameraManager } from "../../Game/Manager/CameraManager";

const { ccclass, property } = _decorator

@ccclass
export class PlayerMovementLimit extends Component {
    @property(PlayerSize) size: PlayerSize

    @property(CCFloat) width = 10;
    @property(CCFloat) height = 10;


    camSize: CameraSize
    protected onLoad(): void {

        this.size = this.getComponent(PlayerSize)
        this.camSize = CameraManager.getInstance().CameraSize
    }


    protected update(dt: number): void {
    }

    public isLockRight() {
        const x_pos = this.node.position.x;
        const x_cam_pos = this.camSize.node.position.x;
        const halfWidthScene = this.camSize.cameraWorldSize().x;
        const hatfWidthPlayer = this.size.sizeOnScene().x / 2;
        return x_pos + hatfWidthPlayer + this.width > x_cam_pos + halfWidthScene;
    }

    public isLockLeft() {
        const x_pos = this.node.position.x;
        const x_cam_pos = this.camSize.node.position.x;
        const halfWidthScene = this.camSize.cameraWorldSize().x;
        const hatfWidthPlayer = this.size.sizeOnScene().x / 2;
        return x_pos - hatfWidthPlayer - this.width < x_cam_pos - halfWidthScene;
    }

    public isLockTop() {
        const y_pos = this.node.position.y;
        const y_cam_pos = this.camSize.node.position.y;
        const halfHeightScene = this.camSize.cameraWorldSize().y;
        const hatfHeightPlayer = this.size.sizeOnScene().y / 2;
        return y_pos + hatfHeightPlayer + this.height > y_cam_pos + halfHeightScene;
    }

    public isLockBot() {
        const y_pos = this.node.position.y;
        const y_cam_pos = this.camSize.node.position.y;
        const halfHeightScene = this.camSize.cameraWorldSize().y;
        const hatfHeightPlayer = this.size.sizeOnScene().y / 2;
        return y_pos - hatfHeightPlayer - this.height < y_cam_pos - halfHeightScene;
    }

    public isPlayerInLeftCamera() {
        return this.node.position.x - this.camSize.node.position.x < 0
    }

    public isPlayerInBotCamera() {
        return this.node.position.y - this.camSize.node.position.y < 0
    }
}
