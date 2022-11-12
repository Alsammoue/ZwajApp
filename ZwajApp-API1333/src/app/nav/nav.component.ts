import { Component, OnInit } from '@angular/core';
import { subscribeOn, Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


model :any={};

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  login(){

console.log()

this.authService.login(this.model).subscribe(

next=> {console.log('تم الدخول')},
error=>{console.log('لم تتم العملية')}
 
     )
  }

  loggedIn(){

const token=localStorage.getItem('token');
return !! token
  }

  loggedOut(){

    localStorage.removeItem('token');
   console.log('تم الخروج')



   
      }






}
