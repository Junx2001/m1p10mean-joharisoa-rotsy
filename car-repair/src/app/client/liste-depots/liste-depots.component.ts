import { Component, OnInit } from '@angular/core';
import { ReparationService } from 'src/app/global/services/reparation.service';
import { VoitureService } from 'src/app/global/services/voiture.service';

@Component({
  selector: 'app-liste-depots',
  templateUrl: './liste-depots.component.html',
  styleUrls: ['./liste-depots.component.css']
})
export class ListeDepotsComponent implements OnInit {
  voitures! : any;
  constructor(private voitureService : VoitureService,
    private reparationService : ReparationService) { }

  ngOnInit(): void {
    const cars = this.voitureService.getVoituresDepot();
    for (let i=0; i<cars.length; i++){
      const dict = {
        "voiture" : cars[i],
        "reparation" : this.reparationService.getVoitureReparation(cars[i])
      }
      this.voitures.push(dict);
    }

  }

}
