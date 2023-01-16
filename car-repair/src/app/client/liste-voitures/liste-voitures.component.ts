import { Component, OnInit } from '@angular/core';
import { Dict } from 'src/app/global/models/dict.interface';
import { VoitureService } from 'src/app/global/services/voiture.service';


@Component({
  selector: 'app-liste-voitures',
  templateUrl: './liste-voitures.component.html',
  styleUrls: ['./liste-voitures.component.css']
})
export class ListeVoituresComponent implements OnInit {
  title!: string;
  headers! : string[];
  values! : Dict[];
  constructor(private voitureService : VoitureService) { }

  ngOnInit(): void {
    this.title = "Liste de mes voitures";
    this.headers = ["","Immatriculation","Marque","Modèle","Statut"];
    const cars = this.voitureService.getVoitures();
    this.values = [];
    for (let car of cars){
      const dict = {
        'image':'',
        'immatriculation':car.immatriculation,
        'marque':car.marque,
        'modele':car.modele,
        'statut':'<i class="fas fa-circle text-orange-500 mr-2"></i> non déposé'
      }
      this.values.push(dict);
    }
  }

}
