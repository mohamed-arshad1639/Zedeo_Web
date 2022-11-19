import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-otp-verification",
  templateUrl: "./otp-verification.component.html",
  styleUrls: ["./otp-verification.component.scss"],
})
export class OtpVerificationComponent implements OnInit {

  otpFinaldata:any 
  col1: any;
  col2: any;
  col3: any;
  col4: any;
  errorMessage: any;
  otp: any;
  CUST_ID :any
  email:any
  name:any
  password:any
  phone:any 

  constructor(private authService: AuthService, private router: Router,private toaster:ToastrService) {

     
  }

  ngOnInit(): void {

    this.otpFinaldata=history.state

    console.log("state",
    this.otpFinaldata);
    

    // this.authService.myMethod$
    
    // .subscribe((data) => {
    //   console.log("dataaaaaaaopttttttt",data);
    //   this.otpFinaldata=data
    //   this.otpFinaldata="okkkkkk"
    // }
    // );

     console.log("this.otpFinaldata",this.otpFinaldata);
     
    // this.CUST_ID=data.CUST_ID
    // this.otp=data.otp
    // this.email=data.email
    // this.name=data.name
    // this.phone=data.phone


      
      
  }

 
  // getdata(){

      

  // }
 
  
 
  verifyOtp() {
    debugger
    console.log("stateqwer",
    this.otpFinaldata);

    let CUST_ID = this.otpFinaldata.CUST_ID;
    let email = this.otpFinaldata.email;
    let name = this.otpFinaldata.name;
    let password = this.otpFinaldata.password;
    let phone = this.otpFinaldata.phone;
    this.otp = this.col1 + this.col2 + this.col3 + this.col4;

    console.log("mail",email);
    

    this.authService.otpVerification(CUST_ID,email,name,password,phone,this.otp).subscribe({
      next: (data) => {
        console.log(data);
        this.toaster.success(data,'')
        this.router.navigateByUrl("/pages/login");
      },
      error: (err) => {
        console.log("err",err);
        
        this.errorMessage = err.error.message;
        this.toaster.error(this.errorMessage,'')
      },
    });
  }
}
