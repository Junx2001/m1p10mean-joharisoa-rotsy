import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dict } from 'src/app/global/models/dict.interface';
import { VoitureService } from 'src/app/global/services/voiture.service';


@Component({
  selector: 'app-liste-voitures',
  templateUrl: './liste-voitures.component.html',
  styleUrls: ['./liste-voitures.component.css']
})
export class ListeVoituresComponent implements OnInit {
  title!: string;
  values! : Dict[];
  selectedDevice! : string;

  constructor(private voitureService : VoitureService,
    private router : Router) { }

  ngOnInit(): void {
    this.selectedDevice = 'Filtre des voitures';
    this.title = "Liste de mes voitures";
    const cars = this.voitureService.getVoitures();
    this.values = [];
    for (let car of cars){
      const dict = {
        'image':'<img\
        src="assets/img/2017_hyundai_santa_fe.jpg"\
        class="h-12 w-12 bg-white rounded-full border"\
        alt="image voiture"\
      />',
        'immatriculation':car.immatriculation,
        'marque':car.marque,
        'modèle':car.modele,
        'statut':'<i class="fas fa-circle text-orange-500 mr-2"></i> déposé',
        'statutDepot':1
      }
      this.values.push(dict);
    }
  }
  onFilterDepositCar(deviceValue:string) {
    this.selectedDevice = deviceValue;
    if (deviceValue==='1'){
      // car déposés
    }else if(deviceValue === '0'){
      //car non déposées 
    }
  }
  onViewCarReparations(immatriculation){
    this.router.navigateByUrl(`/reparations/${immatriculation}`);
  }

}
