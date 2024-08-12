import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/User";
import { map } from "rxjs";
import { Product } from "../models/Product";

@Injectable({"providedIn":"root"})
export class ConnectionService{
    static link="http://localhost:8090";
    private apiLink=ConnectionService.link+"/api";
    private user:User;
constructor(private httpClient:HttpClient){
  if(localStorage.getItem("userId")!=null){
       
    this.user=new User(+localStorage.getItem("userId"),"","","","",localStorage.getItem("userKey"))
     
  }else{
      
      this.user=null
  }
}
loggIn(user:User){

  return  this.httpClient.post(this.apiLink+"/auth/logIn",{"userEmail":user.getEmail(),"password":user.getPassword()}).pipe(map(param=>{
    
    this.user=user
    this.user.setKey(param['token'])
    this.user.setId(param['id'])
    
    localStorage.setItem("userId",this.user.getId().toString())
    localStorage.setItem("userKey",this.user.getKey())
  }))
}
getProducts(){
  var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
  .set('Authorization', `Bearer `+this.user.getKey());
  return this.httpClient.get<any[]>(this.apiLink+"/product/getUsersProducts/"+this.user.getId(),{headers:headers_object})
}
addProduct(product:Product){
  var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
  .set('Authorization', `Bearer `+this.user.getKey());
  
 return this.httpClient.post(this.apiLink+"/product/addProduct",{
    "name":product.getName(),
    "ownerId":this.user.getId(),
    "activated":product.isActivated()
  })
}
getProductRecord(id:number){
  var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
  .set('Authorization', `Bearer `+this.user.getKey());
 return this.httpClient.get<any[]>(this.apiLink+"/record/getProductRecords/"+id,{headers:headers_object})
}
getProductRecordsLastMonth(id:number){
  var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
  .set('Authorization', `Bearer `+this.user.getKey());
 return this.httpClient.get<any[]>(this.apiLink+"/record/getProductRecordsLastMonth/"+id,{headers:headers_object})
}
getProductRecordsLastWeek(id:number){
  var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
  .set('Authorization', `Bearer `+this.user.getKey());
 return this.httpClient.get<any[]>(this.apiLink+"/record/getProductRecordsLastWeek/"+id,{headers:headers_object})
}
getProductRecordsLastTrimester(id:number){
  var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
  .set('Authorization', `Bearer `+this.user.getKey());
 return this.httpClient.get<any[]>(this.apiLink+"/record/getProductRecordsTrimester/"+id,{headers:headers_object})
}
getProductRecordsLastYear(id:number){
  var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
  .set('Authorization', `Bearer `+this.user.getKey());
 return this.httpClient.get<any[]>(this.apiLink+"/record/getProductRecordLastYear/"+id,{headers:headers_object})
}
toggleProductActivition(id:number){
  var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
  .set('Authorization', `Bearer `+this.user.getKey());
  return this.httpClient.put(this.apiLink+"/product/toggleProductActivition/"+id,null);
}
}
