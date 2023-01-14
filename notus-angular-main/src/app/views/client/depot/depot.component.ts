import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.css']
})
export class DepotComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  onViewListeVoiture(){
    this.router.navigateByUrl('/client/liste-voitures');
  }

}
