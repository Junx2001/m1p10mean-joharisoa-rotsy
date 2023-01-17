import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reparation } from 'src/app/global/models/reparation.model';
import { PaiementService } from 'src/app/global/services/paiement.service';
import { ReparationService } from 'src/app/global/services/reparation.service';
import { UserService } from 'src/app/global/services/user.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  paiementForm! : FormGroup;
  reparationsEnCours! : Reparation[];
  numberRegex! : RegExp;
  submitted = false;

  constructor(private formBuilder : FormBuilder,
    private reparationService : ReparationService,
    private userService : UserService,
    private paiementService : PaiementService) { }

  ngOnInit(): void {
    this.numberRegex = /^[1-9]\d*(\.\d+)?$/;
    this.reparationsEnCours = this.reparationService.getReparationsEnCours(this.userService.getUserByToken(localStorage.getItem("token")));
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
    this.paiementService.addPaiement(this.paiementForm.value);
    this.submitted = true;
    // console.log(this.paiementService.getPaiementsByReparation(this.paiementForm.value.reparationId));
  }

}
