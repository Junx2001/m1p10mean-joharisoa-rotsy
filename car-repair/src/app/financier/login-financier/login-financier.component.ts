import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-financier',
  templateUrl: './login-financier.component.html',
  styleUrls: ['./login-financier.component.css']
})
export class LoginFinancierComponent implements OnInit {
  roleUser! : string;
  landingPage! : string;
  constructor() { }

  ngOnInit(): void {
    this.roleUser = "responsable financier";
    this.landingPage = '/finance/factures-non-payees';
  }
}
