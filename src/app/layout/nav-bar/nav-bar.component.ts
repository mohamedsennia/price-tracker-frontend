import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
constructor(private userService:UserService){

}
isLoggedIn(){
  return this.userService.isLoggedIn()
}
}
