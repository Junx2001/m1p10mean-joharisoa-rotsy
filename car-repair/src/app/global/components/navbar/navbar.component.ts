import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  pageTitle! : string;
  
  constructor(private userService : UserService) {
  
   }

  ngOnInit(): void {
    const user = this.userService.getUserByToken(localStorage.getItem("token"));
    if (user.role==='financier'){
      this.pageTitle='Responsable financier';
    }else if (user.role==='atelier'){
      this.pageTitle='Responsable atelier';
    }else{
      this.pageTitle=`Application de ${user.name}`;
    }
  }
  
}
