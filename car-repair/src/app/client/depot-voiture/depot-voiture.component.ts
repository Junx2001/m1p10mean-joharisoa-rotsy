import { Component, OnInit } from '@angular/core';
import { Dict } from 'src/app/global/models/dict.interface';
import { VoitureService } from 'src/app/global/services/voiture.service';

@Component({
  selector: 'app-depot-voiture',
  templateUrl: './depot-voiture.component.html',
  styleUrls: ['./depot-voiture.component.css']
})
export class DepotVoitureComponent implements OnInit {
  title!: string;
  values! : Dict[];
  constructor(private voitureService : VoitureService) { }

  ngOnInit(): void {
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
        'statut':'<i class="fas fa-circle text-orange-500 mr-2"></i> non déposé'
      }
      this.values.push(dict);
    }
  }
}
