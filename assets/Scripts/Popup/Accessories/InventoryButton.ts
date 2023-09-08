import { _decorator, Component, instantiate, Node, Prefab, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('InventoryButton')
export class InventoryButton extends Component
{
    public clickCallback: () => void = null;

    public onClick()
    {
        if (this.clickCallback)
        {
            this.clickCallback();
        }
    }
}

