import { Component, OnInit } from '@angular/core';
import { ReparationService } from 'src/app/global/services/reparation.service';
import { Observable } from 'rxjs';
import { VoitureService } from 'src/app/global/services/voiture.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  avg$ : Observable<any>;
  cars$ : Observable<any>;
  defaultCar ! : string;

  constructor(private reparationService : ReparationService,
    private voitureService : VoitureService) { }

  ngOnInit(): void {
    this.cars$ = this.voitureService.getAllCars();
    this.cars$.subscribe(
      (response)=>{
        this.defaultCar = response[0].immatriculation;
        this.avg$ = this.reparationService.getAvgReparationDurationByCar(this.defaultCar);
      }
    );
        
  }
  onFilterCars(immatriculation:string) {
    this.avg$ = this.reparationService.getAvgReparationDurationByCar(immatriculation);    
  }

}
