export class GameSettings{
    public fishManager: FishManagerSettings = new FishManagerSettings();
}

export class FishSettings {
    public id = "";
    public speed : number[] = [];
    public expReward = 0;
    public goldReward = 0;
    public exp = 0;
}

export class IndividualFishSpawners {
    public fishId = "";
    public startDelay = 0;
    public stopDelay = 0;
    public cooldown = 0;
}

export class FishManagerSettings {
    public fishes : FishSettings[] = [new FishSettings()];
    public individualFishSpawners: IndividualFishSpawners[] = [new IndividualFishSpawners()];
}