import { Component, OnInit } from "@angular/core";
import { FormBuilder,FormGroup,Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  loginForm! : FormGroup;
  constructor(private formBuilder : FormBuilder,
    private router : Router ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email : [null, Validators.required],
      password : [null, Validators.required]
    });
  }
  onSubmitLoginForm(){
    this.router.navigateByUrl('/admin/dashboard');
  }
}
