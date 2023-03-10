import { ChangeDetectionStrategy,Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  Observable } from 'rxjs';
import { VoitureService } from 'src/app/global/services/voiture.service';


@Component({
  selector: 'app-liste-voitures',
  templateUrl: './liste-voitures.component.html',
  styleUrls: ['./liste-voitures.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListeVoituresComponent implements OnInit {
  title!: string;
  searchGroup! : FormGroup;
  cars$! : Observable<any>;
  results$ : Observable<any>;
  page : number = 0;

  constructor(private voitureService : VoitureService,
    private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.title = "Liste de mes voitures";
    this.cars$ = this.voitureService.getCarsByUser();
    
    this.searchGroup = this.formBuilder.group({
      'immatriculation':[null],
      'marque':[null],
      'modele':[null],
    },{
      updateOn:'blur'
    });
    this.searchGroup.valueChanges.subscribe(
      value => {
        this.cars$ =this.voitureService.searchCar(value);
      } 
    );
  }
  onFilterDepositCars(depot:number) {
    this.cars$ = this.voitureService.filterDepositCarsByUser(depot);
  }
}

