import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReparationService } from 'src/app/global/services/reparation.service';
import { Observable } from 'rxjs';
import { PaiementService } from 'src/app/global/services/paiement.service';

@Component({
  selector: 'app-details-facture',
  templateUrl: './details-facture.component.html',
  styleUrls: ['./details-facture.component.css']
})
export class DetailsFactureComponent implements OnInit {
  reparation$ : Observable<any>;
  payements$ : Observable<any>;
  validatePay : boolean = false; 
  error : boolean = false;
  reparationId !: string;

  constructor(private route: ActivatedRoute,
    private reparationService : ReparationService,
    private paiementService : PaiementService) { }

  ngOnInit(): void {
    this.reparationId = this.route.snapshot.params['reparationId'];
    this.reparation$ = this.reparationService.getUnpaidReparationsById(this.reparationId);
    this.reparation$.subscribe(v=>console.log(v));
    
    this.payements$ = this.paiementService.getPayementsByReparationId(this.reparationId);    
  }
  onValidPay(paymentId){
    this.paiementService.validatePayement(paymentId).subscribe(
      (response) => {
        this.reparation$ = this.reparationService.getUnpaidReparationsById(this.reparationId);
        this.validatePay = true;
        setTimeout( () => {
          this.validatePay = false;
        }, 2000);
      },
      (error)=>{
        console.error('request failed with error ');
        this.error = true;
        this.error = true;
        setTimeout( () => {
          this.error = false;
        }, 2000);
        
      }
    );
    
  }

}
