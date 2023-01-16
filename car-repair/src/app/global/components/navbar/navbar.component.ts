import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import {filter} from 'rxjs/operators';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() pageTitle! : string;
  linkName! : string;
  
  constructor(private router : Router) {
    this.router.events
     .pipe(filter(e => e instanceof NavigationStart))
     .subscribe((e: NavigationStart) => {
      const navigation  = this.router.getCurrentNavigation();
      this.linkName = navigation.extras.state ? navigation.extras.state.link : '';
     });
  
   }

  ngOnInit(): void {
  }
  
}
