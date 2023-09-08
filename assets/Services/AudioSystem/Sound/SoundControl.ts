import { _decorator, CCFloat, clamp, Component, Node } from 'cc';
import { SoundConfig, SoundName } from './SoundConfig';
const { ccclass, property } = _decorator;

@ccclass('SoundControl')
export class SoundControl extends Component {

    @property([SoundConfig]) sounds : SoundConfig[] = [];
    
    private volume : number = 0.5;
   
    public playSound(soundName : SoundName)
    {
        var sound =  this.sounds.find(x => x.soundName === soundName)
        sound.source.play()
    }


    setSoundVolume(volume : number)
    {
        this.volume =  clamp(volume,0,1);
        this.sounds.forEach(sound => {
            sound.source.volume = this.volume;
        })
    }

    getVolume(){
        return this.volume;
    }


}

