import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReparationService } from 'src/app/global/services/reparation.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-voitures-atelier',
  templateUrl: './voitures-atelier.component.html',
  styleUrls: ['./voitures-atelier.component.css']
})
export class VoituresAtelierComponent implements OnInit {
  cars$ : Observable<any>;
  searchGroup! : FormGroup;

  constructor(private reparationService : ReparationService,
    private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.cars$ = this.reparationService.getAffectedReparations();

    this.searchGroup = this.formBuilder.group({
      'immatriculation':[null],
      'marque':[null],
      'modele':[null],
      'client':[null],
      'dateDepot':[null]
    },{
      updateOn:'blur'
    });
    this.searchGroup.valueChanges.subscribe(
      value => {
        this.cars$ =this.reparationService.searchAffectedReparations(value);
      } 
    );
  }
}
