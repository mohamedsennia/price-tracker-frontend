import { Injectable } from "@angular/core";
import { Product } from "../models/Product";
import { ConnectionService } from "./connection.service";
import { map, Observable } from "rxjs";

@Injectable({
    "providedIn":"root"
})
export class ProductService{
    private products:Product[]
    constructor(private connectionService:ConnectionService){
        this.products=null
    }
    getProducts():Product[]|Observable<Product[]>{
        if(this.products!=null){
            return this.products.slice()
        }else{
           return this.connectionService.getProducts().pipe(map(param=>{
            this.products=[]
            for(let p of param){
                this.products.push(new Product(p["id"],p["name"],p["activated"]))
            }
            
            return this.products.slice()
           },err=>{
            return []
           }))
        }
    }
    addProduct(product:Product){
     return   this.connectionService.addProduct(product)
    }
    toggleProductActivition(id:number){
      return  this.connectionService.toggleProductActivition(id);
    }
}