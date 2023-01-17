import { Component, Input, OnInit } from '@angular/core';
import { ReparationDetails } from '../../models/reparationDetails.model';
import { Voiture } from '../../models/voiture.model';

@Component({
  selector: 'app-info-voiture',
  templateUrl: './info-voiture.component.html',
  styleUrls: ['./info-voiture.component.css']
})
export class InfoVoitureComponent implements OnInit {
  @Input() voiture! : Voiture;
  @Input() reparations! : ReparationDetails;
  
  constructor() { }

  ngOnInit(): void {
  }

}
