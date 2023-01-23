import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-atelier',
  templateUrl: './login-atelier.component.html',
  styleUrls: ['./login-atelier.component.css']
})
export class LoginAtelierComponent implements OnInit {
  roleUser! : string;
  landingPage! : string;
  defaultLogin! : any;
  constructor() { }

  ngOnInit(): void {
    this.defaultLogin={
      'email':'rafa.rotsy@gmail.com',
      'password':'motdepasse'
    };
    this.roleUser = "responsable atelier";
    this.landingPage = '/atelier/reception-voiture';
  }
}
