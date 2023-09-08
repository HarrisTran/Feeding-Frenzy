import { log } from "cc";
import { EventSystem } from "../Services/EventSystem/EventSystem";

export class Evolution{
    private evolutionProgress: number = 0;

    private evolutionLevel: number = 0 ;
    private evoluteChangeEvent : EventSystem<number> = new EventSystem<number>();

    public get EvolutionCompleted(): boolean
    {
        return this.evolutionProgress >= 1;
    }

    public get EvolutionProgress(): number
    {
        return this.evolutionProgress;
    }

    public get EvoluteChangeEvent() : EventSystem<number>
    {
        return this.evoluteChangeEvent;
    }

    public feeding(expReward: number){
        this.evolutionProgress = this.evolutionProgress+expReward;
        this.evoluteChangeEvent.emit(this.evolutionProgress);
    }
}

