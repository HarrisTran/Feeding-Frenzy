import { Component, Sprite, SpriteAtlas, SpriteFrame, Vec2, _decorator, log, resources, UIOpacity, Skeleton, sp, UITransform } from "cc";


// TODO: Move to mediator or somthing
const accessoryPivotMap = {
	None: new Vec2(0.5, 0.5),
	Hat_1: new Vec2(0.5, 0.5),
	Hat_2: new Vec2(0.5, 0.5),
	Hat_3: new Vec2(0.5, 0.5),
	Hat_4: new Vec2(0.5, 0.5),
	Hat_5: new Vec2(0.5, 0.5),
	Hat_6: new Vec2(0.5, 0.5),
}

const { ccclass, property } = _decorator
@ccclass('AccessorySlot')
export class AccessorySlot extends Component
{
	// TODO: Move to mediator or somthing
	private static readonly _accessoryAtlasPath = "/Accessory/Accessories";

	private static _accessorySpriteMap: Map<string, SpriteFrame> = null;

	private static loadAccessoryResources()
	{
		resources.load(AccessorySlot._accessoryAtlasPath, SpriteAtlas, (p, t, i) => { }, (err, data) =>
		{
			if (err)
			{
				throw err;
			}

			this._accessorySpriteMap = new Map<string, SpriteFrame>();

			for (let sprite of data.getSpriteFrames())
			{
				let name = sprite.name;

				this._accessorySpriteMap.set(name, sprite);
			}
		});
	}

	@property(UIOpacity)
	private opacity: UIOpacity;
	@property(Sprite)
	private appearanceSprite: Sprite;
	
	private _loadWait: boolean = false;
	private _accessory: string = "None";

	protected onLoad(): void
	{
		AccessorySlot.loadAccessoryResources();
	}

	protected start(): void
	{

	}

	public Activate()
	{
		this.opacity.opacity = 255;
	}

	public SetAccessory(name: string)
	{
		// if (!AccessorySlot._accessorySpriteMap)
		// {
		// 	log("go here")
		// 	this._loadWait = true;
		// 	return;
		// }
		let spriteAtlas = this.appearanceSprite.spriteAtlas;

		if (name === "None" || !spriteAtlas.getSpriteFrame(name))
		{
			this._accessory = "None";
			this.appearanceSprite.spriteFrame = null
			this.appearanceSprite.getComponent(UITransform)!.setAnchorPoint(new Vec2(0.5,0.5));
			//this.appearanceSprite.getComponent(UITransform)!.anchorPoint = accessoryPivotMap[this._accessory];
			return;
		}

		this._accessory = name;
		this.appearanceSprite.spriteFrame = spriteAtlas.getSpriteFrame(this._accessory);
		this.appearanceSprite.getComponent(UITransform)!.setAnchorPoint(new Vec2(0.5,0.5));
		//this.appearanceSprite.getComponent(UITransform)!.anchorPoint = accessoryPivotMap[this._accessory];
	}

	public RemoveAccessory(name: string)
	{
		this.SetAccessory("None");
	}

	public Deactivate()
	{
		this.opacity.opacity = 0;
	}

	protected update(dt: number): void
	{
		if (this._loadWait)
		{
			if (AccessorySlot._accessorySpriteMap)
			{
				this.SetAccessory(this._accessory);
				this._loadWait = false;
			}
		}
	}
}