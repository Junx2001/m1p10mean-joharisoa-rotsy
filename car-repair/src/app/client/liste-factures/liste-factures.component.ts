import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReparationService } from 'src/app/global/services/reparation.service';
import { ReparationDetailsService } from 'src/app/global/services/reparationDetails.service';
import { VoitureService } from 'src/app/global/services/voiture.service';

@Component({
  selector: 'app-liste-factures',
  templateUrl: './liste-factures.component.html',
  styleUrls: ['./liste-factures.component.css']
})
export class ListeFacturesComponent implements OnInit {
  du! : number;

  reparation$! : Observable<any>;
  car$! : Observable<any>;

  constructor(private reparationDetService : ReparationDetailsService,
    private route : ActivatedRoute,
    private voitureService : VoitureService,
    private reparationService : ReparationService) { }

  ngOnInit(): void {
    const immatriculation = this.route.snapshot.params['immatriculation'];
    this.car$ = this.voitureService.getCarByImmatriculation(immatriculation);
    this.reparation$ = this.reparationService.getCarRepairInProcess(immatriculation);
    this.reparation$.subscribe(
      values =>{
        let total = 0;
        const repDets = values[0].reparationDetail;
        repDets.forEach(element => total += element.montant);
        this.du = total;
      });
 
  }
}
