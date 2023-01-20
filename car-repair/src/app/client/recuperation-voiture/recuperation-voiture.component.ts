import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dict } from 'src/app/global/models/dict.interface';
import { VoitureService } from 'src/app/global/services/voiture.service';
import { concatMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-recuperation-voiture',
  templateUrl: './recuperation-voiture.component.html',
  styleUrls: ['./recuperation-voiture.component.css']
})
export class RecuperationVoitureComponent implements OnInit {
  title!: string;
  depositCars! : Dict[];
  cars$! : Observable<any>;
  constructor(private voitureService : VoitureService) { }

  ngOnInit(): void {
    const cars = this.voitureService.getVoitures(); //Voitures avec bon de sortie
    this.depositCars = [];
    for (let car of cars){
      const dict = {
        'image':'<img\
        src="assets/img/2017_hyundai_santa_fe.jpg"\
        class="h-12 w-12 bg-white rounded-full border"\
        alt="image voiture"\
      />',
        'immatriculation':car.immatriculation,
        'marque':car.marque,
        'modele':car.modele,
        'depot':new Date()
      }
      this.depositCars.push(dict);
    }
  }
  onRecoverCar(immatriculation){
    this.cars$ = this.voitureService.recoverCar(immatriculation).pipe(
      startWith(''),
      concatMap(()=> {
        return this.voitureService.filterDepositCarsByUser(0); 
      })
    );
  }

}
