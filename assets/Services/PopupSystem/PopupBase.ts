import { _decorator, CCFloat, CCString, color, Color, Component, easing, Enum, Node, Sprite, tween, Tween, UIOpacity, v3, Vec3 } from 'cc';
import { PopupType } from './PopupType';


const { ccclass, property } = _decorator;

/**
 * Component for a popup, used as base.
 * 
 * - Supports animation hide() and show();
 */

Enum(PopupType)
@ccclass('PopupBase')
export class PopupBase extends Component
{
    @property({ group: { name: "Base Popup Components", id: "1", displayOrder: 1 }, type: Node })
    protected background: Node;
    @property({ group: { name: "Base Popup Components", id: "1", displayOrder: 1 }, type: Node })
    protected panel: Node;

    @property({ group: { name: "Animation Params", id: "1", displayOrder: 2 }, type: CCFloat })
    protected animTime: number = 0.5;

    @property({ group: { name: "Functional params", id: "2", displayOrder: 1 }, type: CCString })
    protected popupCode: string;

    @property({type : PopupType}) Type : PopupType;
    protected _isShown: boolean;
    protected _isTransiting: boolean;

    public getPopupCode(): string
    {
        return this.popupCode;
    }

    protected onLoad(): void
    {
        this._isShown = false;
    }

    protected start(): void
    {
        
    }

    protected animateShow()
    {
        // this.node.active = true;
        // this.node.scale = Vec3.ZERO
        // tween(this.node).to(0.25,{ scale : new Vec3(1,1,1) }).start()
        // this.background.getComponent(Sprite).color = new Color(255,255,255,0)
        // this.onShowStart();
        this.node.active = true;
        this.panel.scale = Vec3.ZERO;
        this.background.getComponent(UIOpacity).opacity = 0;
        this.onShowStart();

        this.TweenShowScalePopUp(this.panel, this.animTime, 1).start();
        this.TweenShowALphaBG(this.background, this.animTime).start();


        this._isTransiting = true;
        this.scheduleOnce(() => 
        {
            this.onShowEnd();
            this._isShown = true;
            this._isTransiting = false;
        }, this.animTime);
    }

    protected animateHide()
    {
        this.onHideStart();

        this.TweenHideScalePopUp(this.panel, this.animTime).start();
        this.TweenHideALphaBG(this.background, this.animTime).start();

        this._isTransiting = true;
        this.scheduleOnce(() => 
        {
            this.onHideEnd();
            this._isShown = false;
            this._isTransiting = false;
            this.node.active = false;
        }, this.animTime);
    }

    protected onShowStart()
    {
        
    }
    
    protected onShowEnd()
    {
        
    }

    protected onHideStart()
    {
        
    }

    protected onHideEnd()
    {
        
    }

    public show()
    {
        if (this._isShown || this._isTransiting)
            return;
        this.animateShow();
    }

    public hide()
    {
        if (!this._isShown || this._isTransiting)
            return;
        
        this.animateHide();
    }

    public toggle()
    {
        if (!this._isShown)
        {
            this.show();
        }
        else
        {
            this.hide();
        }
    }

    public showImmediately()
    {
        this._isShown = true;
        this.node.active = true;
    }

    public hideImmediately()
    {
        this._isShown = false;
        this.node.active = false;
    }


    protected TweenShowScalePopUp(target: Node, time: number, scale: number): Tween<Node>
    {
        return tween(target).to(time, { scale: new Vec3(scale, scale, scale) }, { easing: 'backOut' });
    }

    protected TweenHideScalePopUp(target: Node, time: number): Tween<Node>
    {
        return tween(target).to(time, { scale: new Vec3(0, 0, 0) }, { easing: 'backIn' });
    }

    protected TweenShowALphaBG(target: Node, time: number): Tween<UIOpacity>
    {
        return tween(target.getComponent(UIOpacity)).to(time, { opacity: 255 }, { easing: 'quadOut' });
    }

    protected TweenHideALphaBG(target: Node, time: number): Tween<UIOpacity>
    {
        return tween(target.getComponent(UIOpacity)).to(time, { opacity: 0 }, { easing: 'quadOut' });
    }
}