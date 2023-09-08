import { _decorator, Component, Enum, Node } from 'cc';
import { MusicName } from './Music/MusicConfig';
import { MainGameManager } from '../../Scripts/Game/Manager/MainGameManager';
const { ccclass, property } = _decorator;

Enum(MusicName)
@ccclass('MusicTheme')
export class MusicTheme extends Component {
    @property({type : MusicName}) musicName : MusicName
    start() {
        MainGameManager.instance.audioManager.musicControl.playMusic(this.musicName)
    }
}

