import { _decorator, AudioClip, AudioSource, Component, director, game, Node } from 'cc';
import { SoundControl } from './Sound/SoundControl';
import { MusicControl } from './Music/MusicControl';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {

    @property(SoundControl) soundControl : SoundControl = null
    @property(MusicControl) musicControl : MusicControl = null
    
}

