import {_decorator, EventTarget, Component, Node, Enum, UITransform, EventTouch, Vec3, Size, CCInteger, Input, EventKeyboard, KeyCode, input, log} from "cc";
const { ccclass, property } = _decorator;

export const instance = new EventTarget();

export const SET_JOYSTICK_TYPE = "SET_JOYSTICK_TYPE";

export enum DirectionType {
  FOUR,
  EIGHT,
  ALL,
}

export enum SpeedType {
  STOP,
  NORMAL,
  FAST,
}


export interface JoystickDataType {
  speedType: SpeedType;
  moveVec: Vec3;
}

@ccclass("Joystick")
export class Joystick extends Component {
  @property({type: Node, displayName: "Dot"}) private dot: Node | null = null;

  @property({type: Node, displayName: "Ring"}) private ring: Node | null = null;

  @property({type: Enum(DirectionType), displayName: "Direction Type"}) private directionType = DirectionType.ALL;

  @property(Vec3) private _stickPos = new Vec3();

  @property({type: CCInteger, displayName: "Ring Radius"}) private radius = 50;

  //@property(Node) private speedBtn : Node | null = null;

  private moveVector: Vec3 ;

  onLoad() {
    if (!this.dot) {
      console.warn("Joystick Dot is null!");
      return;
    }

    if (!this.ring) {
      console.warn("Joystick Ring is null!");
      return;
    }

    const uiTransform = this.ring.getComponent(UITransform);
    const size = this.radius * 2;
    const ringSize = new Size(size, size);
    uiTransform?.setContentSize(ringSize);
    this.ring.getChildByName("bg")!.getComponent(UITransform)?.setContentSize(ringSize);

    this._initTouchEvent();
  }

  private _initTouchEvent() {
    this.node.on(Input.EventType.TOUCH_START, this._touchStartEvent, this);
    this.node.on(Input.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
    this.node.on(Input.EventType.TOUCH_END, this._touchEndEvent, this);
    this.node.on(Input.EventType.TOUCH_CANCEL, this._touchEndEvent, this);

    // input.on(Input.EventType.KEY_DOWN,this._touchSpeedEvent,this);
    // input.on(Input.EventType.KEY_UP,this._touchSpeedCancelEvent,this);

  }

// private _touchSpeedEvent(event: EventKeyboard){
//     const moveVector = this.moveVector;
//     if(event.keyCode === KeyCode.KEY_A){
//       instance.emit(Input.EventType.TOUCH_MOVE, event, {
//         speedType: SpeedType.FAST,
//         moveVec: moveVector,
//       });
//       log("===>==>==>==>==>==>==>==>");
//     }
//   }

  // private _touchSpeedCancelEvent(event: EventKeyboard){
  //   const moveVector = this.moveVector;
  //   if(event.keyCode === KeyCode.KEY_A){
  //     instance.emit(Input.EventType.TOUCH_MOVE, event, {
  //       speedType: SpeedType.NORMAL,
  //       moveVec: moveVector,
  //     });
  //     log("===>==>==>");
  //   }
  // }

  private _touchStartEvent(event: EventTouch) {
    if (!this.ring || !this.dot) return;

    instance.emit(Input.EventType.TOUCH_START, event);

    const location = event.getUILocation();
    const touchPos = new Vec3(location.x, location.y);

    this._stickPos = this.ring.getPosition();

    const moveVec = touchPos.subtract(this.ring.getPosition());
    const distance = moveVec.length();

    if (this.radius > distance) {
      this.dot.setPosition(moveVec);
    }
  }

  private _touchMoveEvent(event: EventTouch) {
    if (!this.dot || !this.ring) return;

    const location = event.getUILocation();
    const touchPos = new Vec3(location.x, location.y);
    // move vector
    const moveVec = touchPos.subtract(this.ring.getPosition());
    this.moveVector = moveVec;
    const distance = moveVec.length();

    let speedType = SpeedType.NORMAL;
    if (this.radius > distance) {
      this.dot.setPosition(moveVec);
    } else {
      this.dot.setPosition(moveVec.normalize().multiplyScalar(this.radius));
    }

    instance.emit(Input.EventType.TOUCH_MOVE, event, {
      speedType,
      moveVec: moveVec.normalize(),
    });

  }

  private _touchEndEvent(event: EventTouch) {
    if (!this.dot || !this.ring) return;

    this.dot.setPosition(new Vec3());
    instance.emit(Input.EventType.TOUCH_END, event, {
      speedType: SpeedType.STOP,
    });
  }

  protected onDestroy(): void {
    this.node.off(Input.EventType.TOUCH_START, this._touchStartEvent, this);
    this.node.off(Input.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
    this.node.off(Input.EventType.TOUCH_END, this._touchEndEvent, this);
    this.node.off(Input.EventType.TOUCH_CANCEL, this._touchEndEvent, this);

    // input.off(Input.EventType.KEY_DOWN,this._touchSpeedEvent,this);
    // input.off(Input.EventType.KEY_UP,this._touchSpeedCancelEvent,this);
  }
}
