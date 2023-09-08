import { _decorator, animation, Component, director, game, log,math,Node, Skeleton, sp, Vec2, Vec3 } from "cc";
import { PlayerStatesStore } from "./PlayerStatesStore";
import { ReadInputJoystick } from "./ReadInputJoystick";
import { EatReader } from "./EatReader";
import { PlayerSize } from "./PlayerSize";
import { PlayerMovementLimit } from "./PlayerMovementLimit";
import { SpeedType } from "../../Joystick";
import { SpeedControl } from "../../SpeedControl";
import { Fish } from "../../Common/Fish";
import { FishNameScore } from "../../FishAI/FishContent/FishNameScore";
import { RankManager } from "../../FishManager/RankManager";
import { MainGameManager } from "../../Game/Manager/MainGameManager";

const {ccclass,property} = _decorator

@ccclass
export class PlayerContents extends Component{

    @property({type : Node}) public Player : Node;
    @property(EatReader) eatReader : EatReader;
    @property(PlayerSize) size : PlayerSize;
    @property(Fish) selffish : Fish

    @property(sp.Skeleton) 
    public playerAnimation: sp.Skeleton = null!;

    @property(PlayerMovementLimit) 
    public movementLimit : PlayerMovementLimit;

    @property(SpeedControl)
    public speedControl: SpeedControl = null; 
    
    public States : PlayerStatesStore = new PlayerStatesStore()
    public ReadJoystick :ReadInputJoystick = new ReadInputJoystick()
    private speed: number = 0;
    
    zAngle = 0
    protected onLoad(): void {

      //MainGameManager.instance.addPlayerSkeleton(this.playerAnimation)
      this.eatReader.OnEats.push(this.States)
      this.eatReader.OnEats.push(this.size)
      this.States.loadContents(this)
      this.selffish = this.getComponent(Fish)
      this.selffish.fishNameScore = this.getComponent(FishNameScore)
      this.selffish.fishNameScore.nameFish.string = MainGameManager.instance.dataPlayerManager.getUsername()
      this.selffish.IndividualExp = 0
      this.selffish.exp = 0
      this.speedControl.init();
      RankManager.getInstance().addPlayer(this.selffish.fishNameScore)
      RankManager.getInstance().addNameScore(this.selffish.fishNameScore)
    }

        public gameTick(deltaTime: number): void 
    {
      this.playerOnUpdate(deltaTime)
      this.selffish.gameTick(deltaTime)
      if(this.speedControl.getSpeedType() === SpeedType.FAST){
        this.speed = 500;
      }
      if(this.speedControl.getSpeedType() === SpeedType.NORMAL){
        this.speed = 350;
      }
      if(this.ReadJoystick.currentSpeedType == SpeedType.STOP)
      {
        this.speed = 0;
      }
      this.move();
      this.speedControl.gameTick(deltaTime);
    }
  
    public playerOnUpdate(deltaTime: number)
    {
      this.States.currentState.onUpdate(deltaTime);
          }

    private move() 
    {
        var player = this.Player;
        var moveDirection = this.catulatorMoveDirection().normalize()
        player.eulerAngles = new Vec3(0, moveDirection.x < 0 ? 0 : 180, 0);
        this.playerAnimation.node.eulerAngles = new Vec3(0,0,this.angleZ(moveDirection.y,moveDirection.x))
        const oldPos = player.getWorldPosition();
        const newPos = oldPos.add(moveDirection.multiplyScalar(this.speed*game.deltaTime)); // fps : 60;
        player.setWorldPosition(newPos);
    }
    private catulatorMoveDirection()
    {  
        var joystickDirection  = this.ReadJoystick.moveDirection();
        var isLockX = !((this.movementLimit.isLockRight() && !this.movementLimit.isPlayerInLeftCamera() && joystickDirection.x > 0)  || (this.movementLimit.isLockLeft() && this.movementLimit.isPlayerInLeftCamera() && joystickDirection.x < 0))
        var xDirectionMove = isLockX ? joystickDirection.x : 0
        
        var isLockY = !((this.movementLimit.isLockTop() && !this.movementLimit.isPlayerInBotCamera()) && joystickDirection.y > 0 || (this.movementLimit.isLockBot() && this.movementLimit.isPlayerInBotCamera() && joystickDirection.y < 0))
        var yDirectionMove = isLockY ? joystickDirection.y : 0

        return new Vec3(xDirectionMove, yDirectionMove,0)
    }

    private angleZ(y: number, x : number)
    {
      var zEulerAngles = -Math.atan2(y,x)*180/Math.PI
      if(zEulerAngles < -15)
      {
        zEulerAngles = -15
      }
      if(zEulerAngles > 15)
      {
        zEulerAngles = 15
      }
      this.zAngle = this.zAngle +(zEulerAngles- this.zAngle)*5*game.deltaTime

      return this.zAngle
    }
}