import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit {
  roleUser! : string;
  landingPage! : string;
  activatedAccount! : number;
  defaultLogin! : any;
  constructor(private router : Router,private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.defaultLogin={
      'email':'ratsirarsonj@gmail.com',
      'password':'motdepasse'
    };
    if (this.route.snapshot.params['activatedAccount']){
      this.activatedAccount = this.route.snapshot.params['activatedAccount'];
    }
    
    this.roleUser = "client";
    this.landingPage = '';
  }

}
