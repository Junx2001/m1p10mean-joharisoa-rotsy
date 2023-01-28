import { Component, OnInit } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  landingPage! : string;
  roleUser! : string;


  activatedAccount! : number;
  defaultLogin! : any;
  constructor(
    private router : Router,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.defaultLogin={
      'email':'ratsirarsonj@gmail.com',
      'password':'motdepasse'
    };
    if (this.route.snapshot.params['activatedAccount']){
      this.activatedAccount = this.route.snapshot.params['activatedAccount'];
    }

    this.landingPage = '';
    this.roleUser = "Client";
  
  }
  onRegister(){
    this.router.navigateByUrl('/register');
  }
}
