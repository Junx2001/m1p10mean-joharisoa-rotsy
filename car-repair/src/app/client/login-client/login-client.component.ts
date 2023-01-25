import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/global/services/auth.service';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit {
  loginForm! : FormGroup;
  errorMessage! : string;
  success! : string;
  showAlert! : boolean;

  activatedAccount! : number;
  defaultLogin! : any;
  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private authService : AuthService,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.defaultLogin={
      'email':'ratsirarsonj@gmail.com',
      'password':'motdepasse'
    };
    if (this.route.snapshot.params['activatedAccount']){
      this.activatedAccount = this.route.snapshot.params['activatedAccount'];
    }
    
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
  onSubmitLoginForm(){
    // login from API
    this.authService.login(this.loginForm.value).subscribe(
      (response) =>{ 
        console.log("response received");
        // this.reponse = response;
        localStorage.setItem("token",response.token);
        this.showAlert = true;
        this.success = "Vous êtes connecté."
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
        this.router.navigateByUrl('');
      }
    );

  }
  onRegister(){
    this.router.navigateByUrl('/register');
  }
}
