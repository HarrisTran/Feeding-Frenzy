import { _decorator, CCString, Component, Node, sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SkeletonInstance')
export class SkeletonInstance {
    @property(sp.SkeletonData) animation : sp.SkeletonData = null;
    @property(CCString) path: string = "";
}
