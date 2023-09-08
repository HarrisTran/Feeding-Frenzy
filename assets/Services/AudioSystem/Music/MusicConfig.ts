import { AudioClip, AudioSource, Enum, _decorator } from "cc";

export enum MusicName
{
    MENU_THEME,
    GAMEPLAY_THEME
}

const {ccclass,property} =_decorator
@ccclass('MusicConfig')
export class MusicConfig
{
    @property({type : Enum(MusicName)}) musicName : MusicName;
    @property(AudioSource) source : AudioSource = null;
}