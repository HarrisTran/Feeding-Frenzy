import { Component, Label, Sprite, TERRAIN_HEIGHT_BASE, _decorator, log, randomRangeInt } from "cc";
import { FishNameScore } from "../FishAI/FishContent/FishNameScore";
import { CameraManager } from "../Game/Manager/CameraManager";
import { MainGameManager } from "../Game/Manager/MainGameManager";

const {ccclass,property} =_decorator
@ccclass('RankManager')
export class RankManager extends Component
{
    private static instance : RankManager

    @property(FishNameScore) nameScores : FishNameScore [] = []
    @property(Label) fish1st : Label
    @property(Label) fish2st : Label
    @property(Label) fish3st : Label
    @property(Label) playerName : Label
    @property(Label) PlayerScore : Label

    @property(Sprite) crown : Sprite 
    
    @property(FishNameScore) player : FishNameScore

    protected onLoad(): void {
        RankManager.instance = this
    }
    public static getInstance()
    {
        return  RankManager.instance
    }

    addNameScore(nameSacore : FishNameScore)
    {
        if(nameSacore == null) return
        this.nameScores.push(nameSacore)
        if(this.nameScores.length > 3)
        this.sortRank()
    }

    sortRank()
    {
        this.nameScores.sort(function(a, b) {
            if (a.score < b.score) return 1;
            if (a.score > b.score) return -1;
            return 0;
        })
        this.fish1st.string = this.nameScores[0].nameFish.string
        this.fish2st.string = this.nameScores[1].nameFish.string
        this.fish3st.string = this.nameScores[2].nameFish.string

        for(var i =0; i< this.nameScores.length; i++)
        {
            this.nameScores[i].setRank(i+1)
        }

        if(!this.player || !this.playerName) return
        this.playerName.string = this.player.nameFish.string
        this.PlayerScore.string = this.player.scoreFish.string
        
        if(this.playerName.string === this.fish1st.string)
        {
            this.player.setRank(1)
            this.crown.spriteFrame = this.crown.spriteAtlas.getSpriteFrame("Crown")
        }
        else if(this.playerName.string === this.fish2st.string)
        {
            this.player.setRank(2)
            this.crown.spriteFrame = this.crown.spriteAtlas.getSpriteFrame("Crown gray")
        }
        else if(this.playerName.string === this.fish3st.string)
        {
            this.player.setRank(3)
            this.crown.spriteFrame = null
        }
    }

    addPlayer(FishNameScore : FishNameScore)
    {
        this.player = FishNameScore
        log(MainGameManager.instance.dataPlayerManager.getUsername())
        this.player.nameFish.string = MainGameManager.instance.dataPlayerManager.getUsername()
    }
    
    balance()
    {
        var cameraWPos = CameraManager.getInstance().stateFollow.node.position
        var cameraWSize = CameraManager.getInstance().CameraSize.cameraWorldSize()
        this.nameScores.forEach(element => {

            
            var checkX = element.node.position.x > cameraWPos.x+cameraWSize.x || element.node.position.x < cameraWPos.x-cameraWSize.x
            var checkY = element.node.position.y > cameraWPos.y+cameraWSize.y || element.node.position.y < cameraWPos.y-cameraWSize.y
            if(checkX && checkY)
            {
                var gain = randomRangeInt(2,15)
                element.safeFish.exp += gain
                element.safeFish.IndividualExp = element.safeFish.exp
                element.addScore(gain)
            }
            this.sortRank()
        });
    }

    getRankPlayer()
    {
        return this.nameScores.indexOf(this.player)
    }
}