import { Vec2, Vec3, _decorator, log, random, randomRange, randomRangeInt } from "cc";
import { Fish } from "../../Common/Fish";
import { CameraManager } from "../../Game/Manager/CameraManager";
import { BackGround } from "../../Common/BackGround";

const {ccclass} =_decorator
@ccclass('Summon')
export class Summon
{
    protected safeFish : Fish
    initFish( fish : Fish)
    {
        this.safeFish = fish
    }
    public spawn(worldPos : Vec3)
    {
        this.safeFish.node.setWorldPosition(worldPos.x,worldPos.y,0)
        this.safeFish.node.eulerAngles = new Vec3(0,randomRange(0,1) < 1  ? 180 : 0,0)
    }

    public respawn()
    {
        var posSpawn = this.getPosSpawm()
        this.safeFish.node.setPosition(posSpawn.posX,posSpawn.posY,0)
        this.safeFish.node.eulerAngles = new Vec3(0,posSpawn.eulerY,0)
    }

    private getPosSpawm()
    {
        var cameraWPos = CameraManager.getInstance().stateFollow.node.position
        var cameraWSize = CameraManager.getInstance().CameraSize.cameraWorldSize()
        var backGround = BackGround.getInstance().node.position

        var posX =0
        var posY = 0
        var y1 = randomRange(cameraWPos.y+cameraWSize.y,backGround.y+2048)
        var y2 = randomRange(cameraWPos.y-cameraWSize.y,backGround.y-2048)
        posY =backGround.y+ randomRange(0,1) < 0.5 ? y1 : y2

        var x1 = randomRange(cameraWPos.x+cameraWSize.x,backGround.x+2048)
        var x2 = randomRange(cameraWPos.x-cameraWSize.x,backGround.x-2048)
        posX =backGround.y+ randomRange(0,1) < 0.5 ? x1 : x2
        var erularY = Math.random() < 0.5? 180 : 0
        return {posX,posY,eulerY: erularY}
    }
    private isCamLeft()
    {
        return CameraManager.getInstance().node.worldPosition.x - BackGround.getInstance().node.worldPosition.x <=0
    }
    private isCamBot()
    {
        return CameraManager.getInstance().node.worldPosition.y - BackGround.getInstance().node.worldPosition.y <=0
    }

    public setWorldPos(worldPos : Vec2)
    {

    }
}