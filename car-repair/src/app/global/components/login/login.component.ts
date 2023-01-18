import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() role! : string;
  @Input() landingPage! : string;
  loginForm! : FormGroup;
  user! : User;
  errorMessage! : string;
  showAlert! : boolean;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private userService : UserService,
    private authService : AuthService) { }

  ngOnInit(): void {
    this.showAlert = false;
    this.loginForm = this.formBuilder.group({
      email : [null, Validators.required],
      password : [null, Validators.required]
    })
  }
  onSubmitLoginForm(){
    // login from API
    this.userService.login(this.loginForm.value).pipe(
      tap(value=>console.log(value))
    ).subscribe();

    // this.user = this.userService.getUserByCredentials(this.loginForm.value);
    // if (this.user){
    //   this.authService.login(this.user);
    //   localStorage.setItem("token", this.authService.getToken());
    //   // console.log(`active : ${this.user.active}`);
    // }else{
    //   this.showAlert = true; 
    //   this.errorMessage = "Email ou mot de passe invalide";
    // }
    // this.router.navigateByUrl(this.landingPage);
  }

}
