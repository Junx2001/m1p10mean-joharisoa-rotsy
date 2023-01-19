import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-voiture',
  templateUrl: './info-voiture.component.html',
  styleUrls: ['./info-voiture.component.css']
})
export class InfoVoitureComponent implements OnInit {
  @Input() voiture! : any;
  @Input() depot! : string;
  constructor() { }

  ngOnInit(): void {
  }

}
