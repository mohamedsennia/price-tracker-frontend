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
    getProducts():Observable<Product[]>{
        
           return this.connectionService.getProducts().pipe(map(param=>{
            this.products=[]
            for(let p of param){
                this.products.push(new Product(p["id"],p["name"],p["activated"],p["finishedIntialScrapping"]))
            }
          
            return this.products.slice()
           },err=>{
            return []
           }))
        
    }
    getNotReadyProducts(products: Product[], window: Window & typeof globalThis){
        let notReadyProducts:Product[]=[]
       
        for(let product of products){
            if(!product.hasFinishedIntialScrapping()){
                notReadyProducts.push(product)
            }
        }
      if(notReadyProducts.length>0){
       let interval= setInterval(()=>{
            if(window.location.href.includes("dashboard")) {
            for(let product of notReadyProducts){
             this.connectionService.getProductFinishedIntialScrapping(product.getId()).subscribe((param)=>{
              if(param==true){
                    window.location.reload()
                }
             })
            } 
            
         }else{
           clearInterval(interval)
         }},1000)
      }
    }
    addProduct(product:Product){
     return   this.connectionService.addProduct(product)
    }
    toggleProductActivition(id:number){
      return  this.connectionService.toggleProductActivition(id);
    }
}