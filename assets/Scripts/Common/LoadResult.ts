import { Component, Label, _decorator } from "cc";
import { ResultManager } from "./ResultManager";

const {ccclass, property} =_decorator
@ccclass('LoadResult')
export class LoadResult extends  Component
{
    @property(Label) rank : Label
    @property(Label) kill : Label

    protected onLoad(): void {
        this.rank.string =  ResultManager.instance.currentRank.toString()
        this.kill.string = ResultManager.instance.currentKill.toString()
    }
}