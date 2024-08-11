export class Record{
    
    
    constructor(private date:Date,private averagePrice:number){}
    getDate(){
        return this.date
    }
    getAveragePrice(){
        return this.averagePrice
    }
}