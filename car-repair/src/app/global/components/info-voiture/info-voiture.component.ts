import { Component, Input, OnInit } from '@angular/core';
import { Reparation } from '../../models/reparation.model';
import { ReparationDetails } from '../../models/reparationDetails.model';
import { Voiture } from '../../models/voiture.model';

@Component({
  selector: 'app-info-voiture',
  templateUrl: './info-voiture.component.html',
  styleUrls: ['./info-voiture.component.css']
})
export class InfoVoitureComponent implements OnInit {
  @Input() voiture! : Voiture;
  @Input() reparation! : Reparation;
  
  constructor() { }

  ngOnInit(): void {
  }

}
