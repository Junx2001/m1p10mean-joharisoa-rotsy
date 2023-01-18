import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router : Router,
    private authService : AuthService,
    private userService : UserService) { }

  ngOnInit(): void {
    this.authService.logout(this.userService.getUserByToken(localStorage.getItem("token")));
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
