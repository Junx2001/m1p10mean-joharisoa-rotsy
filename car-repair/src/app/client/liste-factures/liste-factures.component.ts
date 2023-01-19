import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReparationService } from 'src/app/global/services/reparation.service';
import { VoitureService } from 'src/app/global/services/voiture.service';

@Component({
  selector: 'app-liste-factures',
  templateUrl: './liste-factures.component.html',
  styleUrls: ['./liste-factures.component.css']
})
export class ListeFacturesComponent implements OnInit {

  reparation$! : Observable<any>;
  car$! : Observable<any>;

  constructor(private route : ActivatedRoute,
    private voitureService : VoitureService,
    private reparationService : ReparationService) { }

  ngOnInit(): void {
    const immatriculation = this.route.snapshot.params['immatriculation'];
    this.car$ = this.voitureService.getCarByImmatriculation(immatriculation);
    this.reparationService.getCarRepairInProcess(immatriculation).subscribe(
      value =>{
        const currentReparationId=value.arrayFinal[0].repair._id;
        this.reparation$ = this.reparationService.getDetailsByReparation(currentReparationId);
      }
    )
    
  }
}
