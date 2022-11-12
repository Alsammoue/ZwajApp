import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

@Input() valuesFromTRegister:any;
@Output() cancelRegister = new EventEmitter();


  constructor(private authService:AuthService) { }


model:any={};


  ngOnInit() {
  }

register(){

this.authService.register(this.model).subscribe(
()=>{console.log('تم الإشتراك بنجاح')},
error=>{console.log(error , "لم يتم الاشتراك")})

}

cancel(){

  console.log('ليس الأن');
  this.cancelRegister.emit(false);

}










}
