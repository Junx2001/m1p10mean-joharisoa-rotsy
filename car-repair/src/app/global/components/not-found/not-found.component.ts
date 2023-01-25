import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  page! : string;
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')){
      this.userService.getCurrentUser().subscribe(
        response => {
          if (response.user.role==='ROLE_USER_FINANCE'){
            this.page=`/finance/`;
          }else if (response.user.role==='ROLE_USER_ATELIER'){
            this.page=`/atelier/`;
          }else{
            this.page='';
          }
        }
        
      );
    }else{
      this.page='';
    }
  }

}
