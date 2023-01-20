import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaiementService } from 'src/app/global/services/paiement.service';
import { ReparationService } from 'src/app/global/services/reparation.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  paiementForm! : FormGroup;
  numberRegex! : RegExp;
  submitted = false;
  errorMessage = false;

  unpaidReparations$! :  Observable<any>;


  constructor(private formBuilder : FormBuilder,
    private reparationService : ReparationService,
    private route : ActivatedRoute,
    private paiementService : PaiementService) { }

  ngOnInit(): void {
    
    
    this.numberRegex = /^[1-9]\d*(\.\d+)?$/;
    this.unpaidReparations$ = this.reparationService.getUnpaidReparations().pipe(
      map(values=>values.arrayFinal)
    );

    if (this.route.snapshot.params['reparationId']){
      const reparationId = this.route.snapshot.params['reparationId']
      this.unpaidReparations$ = this.unpaidReparations$.pipe(
        map(values=>values.filter(reps => reps.repair._id === reparationId))
      );
    }

    
    this.paiementForm = this.formBuilder.group({
      reparationId : [null, Validators.required],
      montant :[0, [Validators.required, Validators.pattern(this.numberRegex)]],
    },{
      updateOn: 'blur'
    });
  }
  get registerFormControl() {
    return this.paiementForm.controls;
  }
  onPay(){
    this.paiementService.pay(this.paiementForm.value).subscribe(
      (response) =>{ 
        console.log("response received");
        this.submitted = true;
      },
      (error)=>{
        console.error('request failed with error');
        this.errorMessage = true;
      }
    )
    
    // console.log(this.paiementService.getPaiementsByReparation(this.paiementForm.value.reparationId));
  }

}
