import { Injectable } from "@angular/core";
import { User } from "../models/User";
import { ConnectionService } from "./connection.service";

@Injectable({
    "providedIn":"root"
})
export class UserService{
 private user:User
 constructor(private connectionService:ConnectionService){
  if(localStorage.getItem("userId")!=null){
       
  this.user=new User(+localStorage.getItem("userId"),"","","","",localStorage.getItem("userKey"))
   
}else{
    
    this.user=null
}
 }
 isLoggedIn(){
    return this.user!=null
 }
 loggIn(user:User){
   this.user=user
  
   return this.connectionService.loggIn(user)
 }
 signUp(user:User){
  this.user=user
  return this.connectionService.signUp(user);
 }
 logOff(){
  localStorage.clear()
   this.user=null
 }
}