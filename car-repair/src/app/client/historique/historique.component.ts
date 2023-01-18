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
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  reparations! : Reparation[];
  voiture! : Voiture;
  values! : Array<Dict[]>;

  constructor(private reparationDetService : ReparationDetailsService,
    private route : ActivatedRoute,
    private voitureService : VoitureService,
    private reparationService : ReparationService) { }

  ngOnInit(): void {
    const immatriculation = this.route.snapshot.params['immatriculation'];
    this.voiture = this.voitureService.getVoitureByImmatriculation(immatriculation);
    this.reparations = this.reparationService.getReparationsByVoiture(this.voiture.id);
    this.values = [];
    for (let rep of this.reparations){
      let child : Dict[]=[];
      const reparationDets = this.reparationDetService.getReparationsDetByReparation(rep.id);
      for(let repDet of reparationDets){
        const temp = {
          'intitulé':repDet.intitule,
          'montant':repDet.montant,
          'avancement': `${repDet.avancement}%`,
        }
        child.push(temp);
      }
      this.values.push(child);
    }
  }

}
