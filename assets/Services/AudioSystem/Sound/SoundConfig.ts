import { AudioClip, AudioSource, CCString,Enum, _decorator } from "cc";
const {ccclass,property} =_decorator

export enum SoundName
{
    EAT,
    CLICKBUTTON,
}
@ccclass('SoundConfig')
export class SoundConfig
{
    @property({type : Enum(SoundName)}) soundName : SoundName ;
    @property(AudioSource) source : AudioSource = null!;
}
