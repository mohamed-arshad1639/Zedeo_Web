import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TokenStorageService } from "src/app/shared/services/token-storage.service";

@Component({
  selector: "app-otp-verification",
  templateUrl: "./otp-verification.component.html",
  styleUrls: ["./otp-verification.component.scss"],
})
export class OtpVerificationComponent implements OnInit {
  credentialData: any;
  verificationtype: any;
  col1: any;
  col2: any;
  col3: any;
  col4: any;
  errorMessage: any;
  otp: any;
  CUST_ID: any;
  email: any;
  name: any;
  password: any;
  phone: any;
  display: any;
  otpButtonFlag: boolean = false;
  SlicedPhoneNumber: any;
  inputs: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private tokenService: TokenStorageService
  ) {
    this.timer(1);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params); // { orderby: "price" }
      this.verificationtype = params.type;
      console.log("verification type", this.verificationtype); // price
    });

    this.authService.myMethod$.subscribe((data) => {
      this.credentialData = data;
      this.SlicedPhoneNumber = this.credentialData.phone.slice(6, 10);

      console.log("SlicedPhoneNumber", this.SlicedPhoneNumber);
      console.log("credentialData", this.credentialData);
    });
  }

  verifyOtp() {
    debugger
    this.otp = this.col1 + this.col2 + this.col3 + this.col4;
    console.log("this.col1",this.col1);
    debugger;
    let CUST_ID = this.credentialData.CUST_ID;
    let email = this.credentialData.email;
    let name = this.credentialData.name;
    let password = this.credentialData.password;
    let phone = this.credentialData.phone;
    
   
    if (this.verificationtype === "phoneVerification") {
      /*phone verification otp */

      debugger;
      this.authService
        .phoneVerification(CUST_ID, email, name, password, phone, this.otp)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.toaster.success(data, "");
            this.router.navigateByUrl("/pages/login");
          },
          error: (err) => {
            console.log("otp err", err);
            this.errorMessage = err.error;
            this.toaster.error(this.errorMessage, "");
          },
        });
    } else if (this.verificationtype === "otpverification") {
      debugger;

      /*phone login otp */

      this.authService
        .otpVerification(CUST_ID, email, name, password, phone, this.otp)
        .subscribe({
          next: (data) => {
            console.log("otp logrd in data", data);

            if (data.token) {
              let CUST_ID = data.CUST_ID;
              let email = data.email;
              let name = data.name;
              let phone = data.phone;
              let token = data.token;

              CUST_ID ? this.tokenService.saveCustId(CUST_ID) : (CUST_ID = "");
              name ? this.tokenService.saveUser(name) : (name = "");
              email ? this.tokenService.saveEmail(email) : (email = "");
              phone ? this.tokenService.savePhoneNumber(phone) : (phone = "");
              token ? this.tokenService.saveToken(token) : (token = "");
              this.toaster.success("Successfully LogedIn", "");
              this.router.navigateByUrl("home/fashion");
            } else {
              this.toaster.error("Something wentWrong");
            }
          },
          error: (err) => {
            console.log("otp err", err);
            this.errorMessage = err.error;
            this.toaster.error(this.errorMessage, "");
          },
        });
    }
  }
  timer(minute) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log("finished");

        this.otpButtonFlag = true;

        clearInterval(timer);
      }
    }, 1000);
  }
}
