import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from "ngx-toastr";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private formBuilder: FormBuilder, private authService:AuthService,private Toaster:ToastrService ) { }
  
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
    console.log(this.loginForm );
    let email = this.loginForm .value.email
    let password = this.loginForm .value.password
   debugger
    console.log("email",password,"password");
    // if (this.loginForm.valid) {
      debugger
      this.authService.login(email,password).subscribe({
        next: data => {
          console.log("ppppppppp",data);
          
          this.errorMessage = data.error;
          this.Toaster.success("", this.errorMessage)
        },
        error: err => {
          console.log("kkkk",err);
          this.errorMessage = err.error;
          this.Toaster.error('',this.errorMessage)
        }
      }); 
    // }
    // else {
    //   alert("invalid form")
    // }
  }
  
  }
  


