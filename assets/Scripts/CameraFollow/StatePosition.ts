import { CCInteger, Camera, Component, Vec2, _decorator, director, log } from "cc";
const {ccclass,property} = _decorator;

@ccclass
export class StatePosition extends Component {

    @property(Camera) private camera : Camera;

    private background : {x:number,y:number} = {x: 4096, y: 4096};
    private _heighScene = 1080;
    private _widthScene = 1920;

    orthoHeight  = 0;
    
    protected start(): void {
        this.orthoHeight = this.camera.orthoHeight;

    }
    
    public isLockHorizontalLeft() {
        var direct = this.camera.node.position.x > 0 ? this._widthScene/this._heighScene*this.orthoHeight : -this._widthScene/this._heighScene*this.orthoHeight
        var resutle = this.camera.node.position.x + direct

        return Math.abs(resutle) > this.background.x*.5 && direct < 0
    }

    public isLockHorizontalRight() {
        var direct = this.camera.node.position.x > 0 ? this._widthScene/this._heighScene*this.orthoHeight : -this._widthScene/this._heighScene*this.orthoHeight
        var resutle = this.camera.node.position.x + direct

        return Math.abs(resutle) > this.background.x*.5 && direct > 0
    }
    

    public isLockVerticalTop(){
        var direct = this.camera.node.position.y > 0 ? this.orthoHeight : - this.orthoHeight
        var resutle = this.camera.node.position.y + direct
        return Math.abs(resutle) > this.background.y*.5 && direct > 0
    }

    public isLockVerticalBot(){
        var direct = this.camera.node.position.y > 0 ? this.orthoHeight : - this.orthoHeight
        var resutle = this.camera.node.position.y + direct
        return Math.abs(resutle) > this.background.y*.5 && direct < 0 
    }   
}