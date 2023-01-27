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
  reparationId : string = null;
  unpaidReparations : any;

  constructor(private formBuilder : FormBuilder,
    private reparationService : ReparationService,
    private route : ActivatedRoute,
    private paiementService : PaiementService) { }

  ngOnInit(): void {
     
    
    this.numberRegex = /^[1-9]\d*(\.\d+)?$/;
    this.unpaidReparations$ = this.reparationService.getUnpaidReparationsByUser().pipe(
      map(values=>values.arrayFinal)
    );

    this.unpaidReparations$.subscribe(
      (response)=>{
        
        for(let obj of response){
          this.reparationService.getUnpaidReparationByIdReparation(obj.repair._id).subscribe(
            (response2) =>{
              this.unpaidReparations = response2;
            }
          )
        }
        
      }
    );
    

    if (this.route.snapshot.params['reparationId']){
      this.reparationId = this.route.snapshot.params['reparationId']
    }

    
    this.paiementForm = this.formBuilder.group({
      reparationId : [this.reparationId, Validators.required],
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

  onPayReparation(reparationId){
    this.reparationId = reparationId;
    this.paiementForm.setValue({reparationId:this.reparationId, montant : 0});
  }

}
