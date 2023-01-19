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
      email : [null, [Validators.required, Validators.email]],
      password : [null, Validators.required]
    })
  }
  onSubmitLoginForm(){
    // login from API
    this.authService.login(this.loginForm.value).subscribe(
      (response) =>{ 
        console.log("response received");
        // this.reponse = response;
        localStorage.setItem("token",response.token);
      },
      (error)=>{
        console.error('request failed with error');
        if (error.status === 401){
          this.showAlert = true; 
          this.errorMessage = "Email ou mot de passe invalide";
        }
      },
      ()=>{
        console.log('Request completed')
        // this.loading = false;
        this.router.navigateByUrl(this.landingPage);
      }
    );

  }

}
