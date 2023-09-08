import { CCFloat, Camera, Component, Vec2, _decorator, } from "cc";

const {ccclass, property} = _decorator

@ccclass
export class CameraSize extends Component
{
    @property(CCFloat) readonly sceneWidth : number = 1920
    @property(CCFloat) readonly sceneHeight : number = 1080

    camera : Camera
    cameraSizeInWorld = Vec2.ZERO

    protected onLoad(): void {
        this.camera = this.getComponent(Camera)
        this.setOrthoHeight(600)
    }
    public getOrthoHeight()
    {
        return this.camera.orthoHeight;
    }

    public setOrthoHeight(ortheHeight : number)
    {
        this.camera.orthoHeight = ortheHeight
        this.cameraSizeInWorld = new Vec2(this.sceneWidth/this.sceneHeight*this.camera.orthoHeight,this.camera.orthoHeight)
    }

    public cameraWorldSize()
    {
        return this.cameraSizeInWorld
    }

}