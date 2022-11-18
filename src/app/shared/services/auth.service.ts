import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';



const AUTH_API = 'http://18.208.225.35/api/user/';

// const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'my-auth-token' }) };
const headerDict = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin':'*'
  // 'Accept': 'application/json',
  // 'Access-Control-Allow-Headers': 'Content-Type',
}

const httpOptions = {
  headers: new HttpHeaders(headerDict)
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  otpData:any
 
  myMethod$: Observable<any>;
  public myMethodSubject = new Subject<any>();

  // private approvalStageMessage = new BehaviorSubject('Basic Approval is required!');
  // currentApprovalStageMessage = this.approvalStageMessage.asObservable();

  constructor( private http: HttpClient, ) { 

    this.myMethod$ = this.myMethodSubject.asObservable()
    

  }
  setDataintoService(data){

    this.myMethodSubject.next(data)
        // this.myMethodSubject.next("okkkkkkkkkkkkkk")

    return true;
  }

  

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    });
  }

  register(name: string,phone:any, email: string, password: string): Observable<any> {
    return   this.http.post(AUTH_API + 'register', {
      name,
      email,
      password,
      phone
    });
    
    
  
    

  }

  otpVerification (CUST_ID :number,email:string,name:string,password:string,phone:string,otp:string): Observable<any> {
    return this.http.post(AUTH_API+'phone-verification', {
      CUST_ID ,
      email,
      name ,
      password ,
      phone ,
      otp
    });
  }
}
