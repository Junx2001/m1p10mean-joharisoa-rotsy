import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaiementService } from 'src/app/global/services/paiement.service';

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.css']
})
export class DepensesComponent implements OnInit {
  depenseForm! : FormGroup;
  submitted : boolean = false;
  errorMessage : boolean = false;

  constructor(private formBuilder : FormBuilder,
    private paiementService : PaiementService) { }

  ngOnInit(): void {
    let numberRegex = /^[1-9]\d*(\.\d+)?$/
    this.depenseForm = this.formBuilder.group({
      intitule : [null, Validators.required],
      montant : [null, [Validators.required, Validators.pattern(numberRegex)]],
    },{
      updateOn: 'blur'
    });
  }
  get depenseFormControl() {
    return this.depenseForm.controls;
  }
  onAddDepense(){
    this.paiementService.addDepense(this.depenseForm.value).subscribe(
      (response) =>{ 
        // console.log("response received");
        this.submitted = true;
      },
      (error)=>{
        // console.error('request failed with error');
          this.errorMessage = true;
      }
    )
  }
}
