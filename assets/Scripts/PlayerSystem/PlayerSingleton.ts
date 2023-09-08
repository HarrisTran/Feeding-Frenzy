import { Component, _decorator } from "cc";
import { PlayerContents } from "./Content/PlayerContent";

const {ccclass, property} =_decorator

@ccclass
export class PlayerSingleton extends Component
{
    private static instance : PlayerSingleton

    @property(PlayerContents) contents : PlayerContents

    public static getInstance()
    {
        return PlayerSingleton.instance
    }

    protected onLoad(): void {
        PlayerSingleton.instance = this;
    }
}