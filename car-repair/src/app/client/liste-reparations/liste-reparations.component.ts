import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReparationService } from 'src/app/global/services/reparation.service';
import { VoitureService } from 'src/app/global/services/voiture.service';

@Component({
  selector: 'app-liste-reparations',
  templateUrl: './liste-reparations.component.html',
  styleUrls: ['./liste-reparations.component.css']
})
export class ListeReparationsComponent implements OnInit {
  reparation$! : Observable<any>;
  car$! : Observable<any>;

  constructor(
    private route : ActivatedRoute,
    private voitureService : VoitureService,
    private reparationService : ReparationService) { }

  ngOnInit(): void {
    const immatriculation = this.route.snapshot.params['immatriculation'];
    this.car$ = this.voitureService.getCarByImmatriculation(immatriculation);
    this.reparation$ = this.reparationService.getCarRepairInProcess(immatriculation);
  }

}
