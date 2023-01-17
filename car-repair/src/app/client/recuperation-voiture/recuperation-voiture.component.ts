import { Component, OnInit } from '@angular/core';
import { Dict } from 'src/app/global/models/dict.interface';
import { VoitureService } from 'src/app/global/services/voiture.service';

@Component({
  selector: 'app-recuperation-voiture',
  templateUrl: './recuperation-voiture.component.html',
  styleUrls: ['./recuperation-voiture.component.css']
})
export class RecuperationVoitureComponent implements OnInit {
  title!: string;
  depositCars! : Dict[];
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
  onRecoverCar(){
    console.log("recupéré");
  }

}
