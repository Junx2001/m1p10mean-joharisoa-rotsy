import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-atelier',
  templateUrl: './login-atelier.component.html',
  styleUrls: ['./login-atelier.component.css']
})
export class LoginAtelierComponent implements OnInit {
  roleUser! : string;
  landingPage! : string;
  constructor() { }

  ngOnInit(): void {
    this.roleUser = "Responsable atelier";
    this.landingPage = '';
  }
}
