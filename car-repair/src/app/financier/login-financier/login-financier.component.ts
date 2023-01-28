import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-financier',
  templateUrl: './login-financier.component.html',
  styleUrls: ['./login-financier.component.css']
})
export class LoginFinancierComponent implements OnInit {
  roleUser! : string;
  landingPage! : string;
  defaultLogin! : any;
  constructor() { }

  ngOnInit(): void {
    this.defaultLogin={
      'email':'finance@carrepair.com',
      'password':'motdepasse'
    };
    this.roleUser = "Responsable Financier";
    this.landingPage = '/finance/factures-non-payees';
  }
}
