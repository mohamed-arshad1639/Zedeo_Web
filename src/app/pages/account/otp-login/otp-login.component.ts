import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from "ngx-toastr";
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-otp-login',
  templateUrl: './otp-login.component.html',
  styleUrls: ['./otp-login.component.scss']
})
export class OtpLoginComponent implements OnInit {

 
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
     phone: ['', [Validators.required,]],
 });
 }
 login() {
  debugger;
  console.log(this.loginForm);
  let phone = this.loginForm.value.phone;
  if (this.loginForm.valid) {
    debugger;
    this.authService.otplogin(phone).subscribe({
      next: (data) => {
        console.log("register sucecss",data);
        this.authService.setDataintoService(data);
        this.router.navigate(["/pages/otpverification"],{queryParams: { type: 'otpverification' }});
      },
      error: (err) => {
        console.log("register err data", err);
        this.errorMessage = err.error;
        this.Toaster.error("", this.errorMessage);
      },
    });
  } else {
    this.Toaster.error('Please Enter Valid Details','Invalid Form')
  }
}



 

}
