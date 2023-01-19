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
    this.userService.getCurrentUser().subscribe(
      response => {
        if (response.user.role==='ROLE_USER_FINANCE'){
          this.pageTitle=`Responsable financier`;
        }else if (response.user.role==='ROLE_USER_ATELIER'){
          this.pageTitle=`Responsable atelier`;
        }else{
          this.pageTitle=`Client`;
        }
      }
      
    );
    
  }
  
}
