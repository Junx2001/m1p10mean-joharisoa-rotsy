import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() role! : string;
  @Input() landingPage! : string;
  @Input() activatedAccount! : number;
  @Input() defaultLogin ! : any;
  loginForm! : FormGroup;
  errorMessage! : string;
  success! : string;
  showAlert! : boolean;
  fieldTextType: boolean;



  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private authService : AuthService) { }

  ngOnInit(): void {
    this.showAlert = false;
    this.loginForm = this.formBuilder.group({
      email : [this.defaultLogin.email, [Validators.required, Validators.email]],
      password : [this.defaultLogin.password, Validators.required]
    })
    if (this.activatedAccount){
      if (this.activatedAccount == 1){
        this.showAlert = true;
        this.success = "Votre compte a été activé."
      }else{
        this.showAlert = true;
        this.errorMessage = "L'activation de votre compte a echoué. Veuillez vous re inscrire."
      }
    }
    
  }
  
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  
  onSubmitLoginForm(){
    // login from API
    this.authService.login(this.loginForm.value).subscribe(
      (response) =>{ 
        // console.log("response received");
        // this.reponse = response;
        localStorage.setItem("token",response.token);
      },
      (error)=>{
        // console.error('request failed with error');
        if (error.status === 401){
          this.showAlert = true; 
          this.errorMessage = "Email ou mot de passe invalide";
        }
      },
      ()=>{
        // console.log('Request completed')
        this.router.navigateByUrl(this.landingPage);
      }
    );

  }

}
