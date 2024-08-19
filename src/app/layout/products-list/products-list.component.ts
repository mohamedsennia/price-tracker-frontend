import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit,OnDestroy{
   products:Product[]
  private subsecreptions:Subscription[]
  name:string
  constructor(private productService:ProductService){
     this.products=[]
     this.subsecreptions=[];
     this.name=""
  }
  ngOnInit(): void {
   
    this.subsecreptions.push((this.productService.getProducts() as Observable<Product[]>).subscribe(param=>{
      this.products=param
      this.productService.getNotReadyProducts(this.products,window)
    })) 
    
  }
  addProduct(){
    this.subsecreptions.push(this.productService.addProduct(new Product(null,this.name,true,false)).subscribe(param=>{
      window.location.reload()
    }))
  }
  toggleProductActivition(product:Product){
    product.toggleActivated();
    this.productService.toggleProductActivition(product.getId()).subscribe((param)=>{
  
    });
  }
  ngOnDestroy(): void {
    for(let subscription of this.subsecreptions){
      subscription.unsubscribe()
    }
  }
 
}
