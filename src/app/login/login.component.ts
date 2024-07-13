import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations:[
    trigger('flipAnimation',[
      state('active', style({
        transform: 'rotateY(180deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('600ms ease-out')),
      transition('inactive => active', animate('600ms ease-in'))
    ])
  ]
})
export class LoginComponent implements OnInit{
   flip: string
   loginForm:FormGroup;
   signUpForm:FormGroup
constructor(){
  this.flip='inactive';
  this.loginForm=new FormGroup({});
  this.signUpForm=new FormGroup({});
}
  ngOnInit(): void {
   this.loginForm=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,[Validators.required])
  })
  this.signUpForm=new FormGroup({
    firstName:new FormControl(null,[Validators.required]),
    lastName:new FormControl(null,[Validators.required]),
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,[Validators.required])
  })
  }
toggleFlip(side:string){
  this.flip =side;
}
signUp(){
  console.log(this.signUpForm.value)
}
login(){
  console.log(this.loginForm.controls["email"])
}
}
