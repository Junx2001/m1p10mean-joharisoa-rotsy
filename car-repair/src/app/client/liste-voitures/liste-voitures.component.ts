import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {  Observable, Subject } from 'rxjs';
import {  filter, map, takeUntil} from 'rxjs/operators';
import { Voiture } from 'src/app/global/models/voiture.model';
import { VoitureService } from 'src/app/global/services/voiture.service';


@Component({
  selector: 'app-liste-voitures',
  templateUrl: './liste-voitures.component.html',
  styleUrls: ['./liste-voitures.component.css']
})
export class ListeVoituresComponent implements OnInit {
  title!: string;
  voitures! : Voiture[];
  searchGroup! : FormGroup;
  cars$! : Observable<any>;

  // resultCarsPreview$! : Observable<Voiture[]>;
  // notifier = new Subject();

  constructor(private voitureService : VoitureService,
    private router : Router,
    private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.title = "Liste de mes voitures";
    this.voitures = this.voitureService.getVoitures();
    this.cars$ = this.voitureService.getCarsByUser();
    
    this.searchGroup = this.formBuilder.group({
      'immatriculation':[null],
      'marque':[null],
      'modele':[null],
      'depot':[null]
    });
    
    // this.resultCarsPreview$ = this.searchGroup.valueChanges.pipe(
    //   map(formValue => this.voitureService.searchVoiture(formValue)),
    //   takeUntil(this.notifier)
    // )
  }
  onFilterDepositCars(depot:number) {
    this.cars$ = this.voitureService.filterDepositCarsByUser(depot);
  }
  onSearchCar(){
    this.voitures = this.voitureService.searchVoiture(this.searchGroup.value);
  }
}

