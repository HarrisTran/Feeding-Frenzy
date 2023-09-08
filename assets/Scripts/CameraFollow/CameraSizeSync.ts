import { _decorator, Camera, CCFloat, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraSizeSync')
export class CameraSizeSync extends Component
{
    @property(Camera)
    private baseCamera: Camera;
    @property([Camera])
    private cameras: Camera[] = [];

    protected lateUpdate(dt: number): void
    {
        for (let cam of this.cameras)
        {
            cam.orthoHeight = this.baseCamera.orthoHeight;
        }
    }
}


