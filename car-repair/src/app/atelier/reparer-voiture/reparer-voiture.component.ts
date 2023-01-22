import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReparationDetailsService } from 'src/app/global/services/reparation-details.service';
import { ReparationService } from 'src/app/global/services/reparation.service';

@Component({
  selector: 'app-reparer-voiture',
  templateUrl: './reparer-voiture.component.html',
  styleUrls: ['./reparer-voiture.component.css']
})
export class ReparerVoitureComponent implements OnInit {
  repairForm ! : FormGroup;
  submitted = false;
  errorMessage = false;
  reparationId : string;
  reparation$ : Observable<any>;

  constructor(private route : ActivatedRoute,
    private reparationService : ReparationService,
    private formBuilder : FormBuilder,
    private reparationDetService : ReparationDetailsService) { }

  ngOnInit(): void {
    this.reparationId = this.route.snapshot.params['reparationId'];
    this.reparation$ = this.reparationService.getReparationDetailsByReparationId(this.reparationId);

    let numberRegex = /^[1-9]\d*(\.\d+)?$/
    this.repairForm = this.formBuilder.group({
      intitule : [null, Validators.required],
      montant : [null, [Validators.required, Validators.pattern(numberRegex)]],
    },{
      updateOn: 'blur'
    });
  }
  get repairFormControl() {
    return this.repairForm.controls;
  }
  onRepair(){    
    this.reparationDetService.addReparationDetails(this.repairForm.value, this.reparationId).subscribe(
      (response) =>{ 
        console.log("response received");
        this.submitted = true;
      },
      (error)=>{
        console.error('request failed with error');
        if (error.status === 409){
          this.errorMessage = true;
        }
      }
    );
  }

}
