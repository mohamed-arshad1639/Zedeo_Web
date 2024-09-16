import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';



const AUTH_API = 'http://18.208.225.35/api/user/';

// const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'my-auth-token' }) };


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  myMethod$: Observable<any>;
  public myMethodSubject = new BehaviorSubject<any>("");

  constructor( private http: HttpClient, ) { 
    this.myMethod$ = this.myMethodSubject.asObservable()
  }

  //function for Data sharing 

  setDataintoService(data){
    this.myMethodSubject.next(data)
  }
  

// login api call

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    });
  }

  // otp login api call

  otplogin(phone: string): Observable<any> {
    return this.http.post(AUTH_API + 'otp-login', {
      phone
    });
  }

  // register api call

  register(name: string,phone:any, email: string, password: string): Observable<any> {
    return   this.http.post(AUTH_API + 'register', {
      name,
      email,
      password,
      phone
    });
    
    
  //  phoneverification call

  }

  phoneVerification (CUST_ID :number,email:string,name:string,password:string,phone:string,otp:string): Observable<any> {
    return this.http.post(AUTH_API+'phone-verification', {
      CUST_ID ,
      email,
      name ,
      password ,
      phone ,
      otp
    });
  }
  
  otpVerification (CUST_ID :number,email:string,name:string,password:string,phone:string,otp:string): Observable<any> {
    return this.http.post(AUTH_API+'otp-verification', {
      CUST_ID ,
      email,
      name ,
      password ,
      phone ,
      otp
    });
  }





}
