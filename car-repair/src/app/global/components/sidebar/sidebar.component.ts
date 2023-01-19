import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user$! : Observable<any>;
  collapseShow = "hidden";
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.user$ = this.userService.getCurrentUser();

  }
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }

}
