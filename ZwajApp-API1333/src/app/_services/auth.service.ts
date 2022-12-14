import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {



baseUrl='https://localhost:7238/api/Auth/';


constructor(private http:HttpClient) { }



login(model:any){

  return this.http.post(this.baseUrl + 'login',model).pipe(
  map((response:any) =>{
    const user =response;
    if(user){localStorage.setItem('token',user.token);}}))
  
  }

register(model:any){

   return this.http.post('https://localhost:7238/api/Auth/register',model);

 }




}
