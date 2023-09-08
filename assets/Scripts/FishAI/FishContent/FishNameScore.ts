import { Component, Label, Sprite, Vec3, _decorator, log,Node } from "cc";
import { RankManager } from "../../FishManager/RankManager";
import { NameStatic } from "../../MatchingUI/NameStatic";
import { Fish } from "../../Common/Fish";

const {ccclass,property} =_decorator
@ccclass('FishNameScore')
export class FishNameScore extends Component
{
    @property(Label) nameFish : Label = null
    @property(Label) scoreFish : Label = null
    score = 0
    rank = 0;
    @property(Sprite) crownSprite: Sprite;

    safeFish : Fish
    initFish(fish : Fish)
    {
        this.setName()
        this.safeFish = fish
        RankManager.getInstance().addNameScore(this)
        this.gameStick(0)
    }

    setRank(rank : number)
    {
        this.rank = rank
        switch (this.rank) {
            case 1:
                this.crownSprite.spriteFrame = this.crownSprite.spriteAtlas.getSpriteFrame("Crown")
                break;
            case 2:
                this.crownSprite.spriteFrame = this.crownSprite.spriteAtlas.getSpriteFrame("Crown gray")
                break;
            default:
                this.crownSprite.spriteFrame = null
                break;
        }
    }
    gameStick(dt : number)
    {
        this.nameFish.node.eulerAngles = new Vec3(0,this.node.eulerAngles.y,0)
        this.scoreFish.node.eulerAngles = new Vec3(0,this.node.eulerAngles.y,0)
    }

    setName()
    {
        this.nameFish.string = NameStatic.getInstance().getName()
    }

    addScore(scoreAddition : number)
    {
        this.score += scoreAddition
        this.scoreFish.string = this.score.toString()
        RankManager.getInstance().sortRank()
    }

    resetFish()
    {
        this.score = 0
        this.setName()
        this.addScore(0)
    }
}