import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dict } from 'src/app/global/models/dict.interface';
import { Reparation } from 'src/app/global/models/reparation.model';
import { ReparationDetails } from 'src/app/global/models/reparationDetails.model';
import { Voiture } from 'src/app/global/models/voiture.model';
import { ReparationService } from 'src/app/global/services/reparation.service';
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
  reparationEnCours ! : Reparation;

  constructor(private reparationDetService : ReparationDetailsService,
    private route : ActivatedRoute,
    private voitureService : VoitureService,
    private reparationService : ReparationService) { }

  ngOnInit(): void {
    const immatriculation = this.route.snapshot.params['immatriculation'];
    this.voiture = this.voitureService.getVoitureByImmatriculation(immatriculation);
    this.reparationEnCours = this.reparationService.getReparationsEnCoursByCar(this.voiture.id);
    this.reparations = this.reparationDetService.getReparationsDetByReparation(this.reparationEnCours.id);

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
        'avancement': `${rep.avancement}%`,
        'statut':statut
      }
      this.values.push(dict);
    }
  }

}
