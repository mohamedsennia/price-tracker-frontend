import { Injectable } from "@angular/core";
import { ConnectionService } from "./connection.service";
import { Record } from "../models/Record";
import { map, Observable } from "rxjs";

@Injectable({providedIn:"root"})
export class RecordService{
    private records:Record[]
constructor(private connectionService:ConnectionService){
    this.records=null
}
getProductRecords(productId:number):Observable<Record[]>{

  return  this.connectionService.getProductRecord(productId).pipe(map(records=>{
        this.records=[]
        for(let r of records){
            this.records.push(new Record(new Date(r['date']),r['averagePrice']));
        }
        return this.records
    },err=>{
        return []
    }))

}
getProductRecordsLastMonth(productId:number):Observable<Record[]>{

    return  this.connectionService.getProductRecordsLastMonth(productId).pipe(map(records=>{
          this.records=[]
          for(let r of records){
              this.records.push(new Record(new Date(r['date']),r['averagePrice']));
          }
          return this.records
      },err=>{
          return []
      }))
  
  }
  getProductRecordsLastWeek(productId:number):Observable<Record[]>{

    return  this.connectionService.getProductRecordsLastWeek(productId).pipe(map(records=>{
          this.records=[]
          for(let r of records){
              this.records.push(new Record(new Date(r['date']),r['averagePrice']));
          }
          return this.records
      },err=>{
          return []
      }))
  
  }
  getProductRecordsLastTrimester(productId:number):Observable<Record[]>{

    return  this.connectionService.getProductRecordsLastTrimester(productId).pipe(map(records=>{
          this.records=[]
          for(let r of records){
              this.records.push(new Record(new Date(r['date']),r['averagePrice']));
          }
          return this.records
      },err=>{
          return []
      }))
  
  }
  getProductRecordsLastYear(productId:number):Observable<Record[]>{

    return  this.connectionService.getProductRecordsLastYear(productId).pipe(map(records=>{
          this.records=[]
          for(let r of records){
              this.records.push(new Record(new Date(r['date']),r['averagePrice']));
          }
          return this.records
      },err=>{
          return []
      }))
  
  }
}