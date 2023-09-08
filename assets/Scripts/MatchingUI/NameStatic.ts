import { _decorator } from "cc";
const {ccclass,property} =_decorator
@ccclass('NameStatic')
export class NameStatic
{
    private static instance : NameStatic
    listNames : string [] = []
    private currentIndexName = 0 
    constructor()
    {
        NameStatic.instance = this
    }

    public static getInstance()
    {
        return NameStatic.instance
    }
    public setListNames(names : Array<string>)
    {
        this.listNames = names
    }

    public getName() : string
    {
        const name = this.listNames[this.currentIndexName]
        this.currentIndexName = this.currentIndexName >= this.listNames.length-1 ? 0 : this.currentIndexName+1
        return name
    }
}