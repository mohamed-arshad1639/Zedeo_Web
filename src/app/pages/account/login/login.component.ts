import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from "ngx-toastr";
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { Router } from "@angular/router";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
     private formBuilder: FormBuilder,
     private authService:AuthService,
     private Toaster:ToastrService,
     private tokenService:TokenStorageService,
     private router:Router )
    { }
  
  loginForm: FormGroup;
  submitted = false;
  isSuccessful:any
  isSignUpFailed:any
  errorMessage:any

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });
  }
  login() {
    debugger
    console.log("login form",this.loginForm );
    let email = this.loginForm .value.email
    let password = this.loginForm .value.password
   debugger
    console.log("login email",email,"login password",password);
    console.log("this.loginForm.valid",this.loginForm.valid);
    
    if (this.loginForm.valid) {
      debugger
      this.authService.login(email,password).subscribe({
        next: data => {
          // console.log("login succes",data);
          if(data.token){

            let  CUST_ID = data.CUST_ID
            let  email = data.email
            let  name = data.name
            let  phone =data.phone
            let  token=data.token

            CUST_ID?this.tokenService.saveCustId(CUST_ID):CUST_ID=''
            name?this.tokenService.saveUser(name):name=''
            email?this.tokenService.saveEmail(email):email=''
            phone?this.tokenService.savePhoneNumber(phone):phone=''
            token?this.tokenService.saveToken(token):token=''
            this.Toaster.success('Successfully Registerd','')
            this.router.navigateByUrl('home/fashion')

          }
          else{
            this.Toaster.error('Something wentWrong')
          }
          // let tid=this.tokenService.getCustId()
          // let tmail= this.tokenService.getEmail()
          // let ttoken=this.tokenService.getToken()
          // let tphone=this.tokenService.getPhoneNumber()
          // let tsuer=this.tokenService.getUser()
        },
        error: err => {
          console.log("login err",err);
          this.errorMessage = err.error;
          this.Toaster.error('',this.errorMessage)
        }
      }); 
    }
    else {
      this.Toaster.error('Invalid Form',"please enter Valid credential")

    }
  }
  
  }


