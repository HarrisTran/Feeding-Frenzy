import { _decorator, AudioSource, Component, Node ,clamp, log} from 'cc';
import { MusicConfig, MusicName } from './MusicConfig';
const { ccclass, property } = _decorator;

@ccclass('MusicControl')
export class MusicControl extends Component {

    @property([MusicConfig]) musics : MusicConfig[] = []

    currentAudioSource : AudioSource = null;
    private volume: number = 0.5;

    protected onLoad(): void {
        this.playMusic(MusicName.MENU_THEME);
    }

    playMusic(musicName: MusicName)
    {
        this.currentAudioSource?.stop()
        this.currentAudioSource = this.musics.find(x => x.musicName === musicName).source
        this.currentAudioSource.play()
    }

    setSoundVolume(volume : number)
    {
        this.volume =  clamp(volume,0,1);
        this.currentAudioSource.volume = this.volume;
    }

    getVolume(){
        return this.volume;
    }
}

