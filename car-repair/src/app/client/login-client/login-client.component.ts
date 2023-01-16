import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit {
  roleUser! : string;
  landingPage! : string;
  constructor(private router : Router) { }

  ngOnInit(): void {
    this.roleUser = "client";
    this.landingPage = '';
  }

}
