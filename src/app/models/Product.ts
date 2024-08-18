import { Record } from "./Record"
export class Product{
   
    private records:Record[]
    constructor(private id:number, private name:string,private activated:boolean,private finishedIntialScrapping:boolean){
        this.records=[]
    }
    getId(){
        return this.id
    }
    getName(){
        return this.name
    }
    isActivated(){
      
        return this.activated;
    }
    toggleActivated(){
        this.activated!=this.activated;
    }
    hasFinishedIntialScrapping(){
        return this.finishedIntialScrapping;
    }
}