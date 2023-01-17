import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dict } from 'src/app/global/models/dict.interface';
import { ReparationDetails } from 'src/app/global/models/reparationDetails.model';
import { Voiture } from 'src/app/global/models/voiture.model';
import { ReparationDetailsService } from 'src/app/global/services/reparationDetails.service';
import { VoitureService } from 'src/app/global/services/voiture.service';

@Component({
  selector: 'app-liste-reparations',
  templateUrl: './liste-reparations.component.html',
  styleUrls: ['./liste-reparations.component.css']
})
export class ListeReparationsComponent implements OnInit {
  reparations! : ReparationDetails[];
  voiture! : Voiture;
  title!: string;
  values! : Dict[];

  constructor(private reparationDetService : ReparationDetailsService,
    private route : ActivatedRoute,
    private voitureService : VoitureService) { }

  ngOnInit(): void {
    const immatriculation = this.route.snapshot.params['immatriculation'];
    this.reparations = this.reparationDetService.getReparationsByCar(immatriculation);
    this.voiture = this.voitureService.getVoitureByImmatriculation(immatriculation);

    this.title = "Liste des réparations";
    this.values = [];
    for (let rep of this.reparations){
      let statut ='';
      if (rep.avancement===0){
        statut = '<i class="fas fa-circle text-red-500 mr-2"></i>pas encore commencé';
      }else if (rep.avancement===100){
        statut = '<i class="fas fa-circle text-emerald-500 mr-2"></i>réparé';
      }else{
        statut='<i class="fas fa-circle text-orange-500 mr-2"></i>en cours';
      }
      const dict = {
        'intitulé':rep.intitule,
        'avancement': rep.avancement,
        'statut':statut
      }
      this.values.push(dict);
    }
  }

}
