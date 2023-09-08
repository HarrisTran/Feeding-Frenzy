import { _decorator, AudioClip, Component, Node } from 'cc';
import { AudioManager } from '../../../Services/AudioSystem/AudioManager';
import { Fish } from '../../Common/Fish';
const { ccclass, property } = _decorator;

@ccclass('GameAudioManager')
export class GameAudioManager extends Component {
    @property(AudioClip) private music: AudioClip;
    @property(AudioClip) private enemyHit: AudioClip;
    @property(AudioClip) private playerDeath: AudioClip;
    @property(AudioClip) private goldPickup: AudioClip;
    @property(AudioClip) private levelUp: AudioClip;

    private audioPlayer: AudioManager;
    //private player: Player;

    public init(
        //player: Player,
        // enemyManager: EnemyManager,
        // itemManager: ItemManager,
        // horizontalLauncher: WaveProjectileLauncher,
        // diagonalLauncher: WaveProjectileLauncher,
        // haloLauncher: HaloProjectileLauncher
    ): void {
        // AppRoot.Instance.AudioPlayer.playMusic(this.music);

        // this.audioPlayer = AppRoot.Instance.AudioPlayer;
        // this.player = player;

        // player.Weapon.WeaponStrikeEvent.on(() => this.audioPlayer.playSound(this.weaponSwing), this);
        // player.Level.LevelUpEvent.on(() => this.audioPlayer.playSound(this.levelUp), this);
        // player.Health.HealthPointsChangeEvent.on(this.tryPlayPlayerHitSound, this);

        // enemyManager.EnemyAddedEvent.on(this.addEnemyListeners, this);
        // enemyManager.EnemyRemovedEvent.on(this.removeFishListeners, this);

        // itemManager.PickupEvent.on(this.playPickupItemSound, this);

        // horizontalLauncher.ProjectileLaunchedEvent.on(() => this.audioPlayer.playSound(this.horizontalProjectileLaunch), this);
        // diagonalLauncher.ProjectileLaunchedEvent.on(() => this.audioPlayer.playSound(this.diagonalProjectileLaunch), this);
        // haloLauncher.ProjectilesLaunchedEvent.on(() => this.audioPlayer.playSound(this.haloProjectileLaunch), this);
    }

    private removeFishListeners(fish: Fish): void {
        //fish.AteEvent.off(this.playEnemyHitSound);
    }

    private playFishAteSound(): void {
        this.audioPlayer.playSound(this.enemyHit);
    }

    // private playPickupItemSound(itemType: ItemType): void {
    //     let clipToPlay: AudioClip;
    //     switch (itemType) {
    //         case ItemType.XP:
    //             clipToPlay = this.xpPickup;
    //             break;
    //         case ItemType.Gold:
    //             clipToPlay = this.goldPickup;
    //             break;
    //         case ItemType.HealthPotion:
    //             clipToPlay = this.healthPotionPickup;
    //             break;
    //         case ItemType.Magnet:
    //             clipToPlay = this.magnetPickup;
    //             break;
    //         case ItemType.Chest:
    //             clipToPlay = this.chestPickup;
    //             break;
    //         default:
    //             break;
    //     }

    //     this.audioPlayer.playSound(clipToPlay);
    // }
}

