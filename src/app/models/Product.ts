import { Record } from "./Record"
export class Product{
   
    private records:Record[]
    constructor(private id:number, private name:string){
        this.records=[]
    }
}