import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { Router } from "@angular/router";
// import { NotifierService } from 'angular-notifier';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  isSuccessful: any;
  isSignUpFailed: any;
  errorMessage: any;
  message: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        Name: ['', [Validators.required]],
        password: ['', [Validators.required,]],
        phone: ["", Validators.required,],
        email: ["", [Validators.required, ]],
        // confirmPassword: ["", Validators.required],
        // acceptTerms: [false, Validators.requiredTrue],
      },
      {
        // Validators.pattern('[a-zA-Z ]*')
        // Validators.pattern('[a-zA-Z0-9]*'),Validators.minLength(6)
        // Validators.pattern('[0-9]'
        // Validators.email
        // validator: MustMatch('password', 'confirmPassword')
      }
    );
  }
  get f() {
    return this.registerForm.controls;
  }

  register() {
    debugger;
    console.log(this.registerForm);

    let Name = this.registerForm.value.Name;
    let phone = this.registerForm.value.phone;
    let email = this.registerForm.value.email;
    let password = this.registerForm.value.password;

    // console.log(" Name", Name, "phone", phone, "email", password, "password");
    // console.log("valid or not", this.registerForm.valid);

    if (this.registerForm.valid) {
      debugger;
      this.authService.register(Name, phone, email, password).subscribe({
        next: (data) => {
          console.log("register sucecss",data);
          this.toastr.success("", data);
          // let go = this.authService.setDataintoService(data);
          this.router.navigateByUrl("/pages/otpverification", { state: data });
        },
        error: (err) => {
          console.log("register err data", err);
          this.errorMessage = err.error.message;
          this.toastr.error("", this.errorMessage);
        },
      });
    } else {
      this.toastr.error('Please Enter  Valid Details','Invalid Form')
    }
  }
}
