import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route : ActivatedRoute,
    private reparationService : ReparationService,
    private formBuilder : FormBuilder) { }

  ngOnInit(): void {

    this.reparationId = this.route.snapshot.params['reparationId'];
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
    this.reparationService.addReparationDetails(this.repairForm.value, this.reparationId);
    this.submitted = true;
  }

}
