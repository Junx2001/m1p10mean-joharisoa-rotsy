import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {  Observable, Subject } from 'rxjs';
import {  map, takeUntil} from 'rxjs/operators';
import { Voiture } from 'src/app/global/models/voiture.model';
import { VoitureService } from 'src/app/global/services/voiture.service';


@Component({
  selector: 'app-liste-voitures',
  templateUrl: './liste-voitures.component.html',
  styleUrls: ['./liste-voitures.component.css']
})
export class ListeVoituresComponent implements OnInit {
  title!: string;
  cars! : Voiture[];
  selectedDevice! : string;
  searchGroup! : FormGroup;
  // resultCarsPreview$! : Observable<Voiture[]>;
  // notifier = new Subject();

  constructor(private voitureService : VoitureService,
    private router : Router,
    private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.selectedDevice = 'Filtre des voitures';
    this.title = "Liste de mes voitures";
    this.cars = this.voitureService.getVoitures();
    
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
  onFilterDepositCar(deviceValue:string) {
    this.selectedDevice = deviceValue;
    if (deviceValue==='1'){
      // car déposés
    }else if(deviceValue === '0'){
      //car non déposées 
    }else{
      this.cars = this.voitureService.getVoitures();
    }
  }
  onViewCarReparations(immatriculation){
    this.router.navigateByUrl(`/reparations/${immatriculation}`);
  }
  onViewCarFactures(immatriculation){
    this.router.navigateByUrl(`/factures/${immatriculation}`);
  }
  onSearchCar(){
    this.cars = this.voitureService.searchVoiture(this.searchGroup.value);
  }
}
