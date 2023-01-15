import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user! : User;
  collapseShow = "hidden";
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUserByToken(localStorage.getItem("token"));
  }
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }

}
