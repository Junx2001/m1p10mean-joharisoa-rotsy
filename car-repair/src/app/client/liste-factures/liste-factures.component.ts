import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dict } from 'src/app/global/models/dict.interface';
import { ReparationDetails } from 'src/app/global/models/reparationDetails.model';
import { Voiture } from 'src/app/global/models/voiture.model';
import { ReparationDetailsService } from 'src/app/global/services/reparationDetails.service';
import { VoitureService } from 'src/app/global/services/voiture.service';

@Component({
  selector: 'app-liste-factures',
  templateUrl: './liste-factures.component.html',
  styleUrls: ['./liste-factures.component.css']
})
export class ListeFacturesComponent implements OnInit {
  reparations! : ReparationDetails[];
  voiture! : Voiture;
  values! : Dict[];
  du! : number;

  constructor(private reparationDetService : ReparationDetailsService,
    private route : ActivatedRoute,
    private voitureService : VoitureService,
    private currency : CurrencyPipe) { }

  ngOnInit(): void {
    const immatriculation = this.route.snapshot.params['immatriculation'];
    this.reparations = this.reparationDetService.getReparationsByCar(immatriculation);
    this.voiture = this.voitureService.getVoitureByImmatriculation(immatriculation);

    this.values = [];
    this.du = 0;
    for (let rep of this.reparations){
      const dict = {
        'intitulé':rep.intitule,
        'montant': this.currency.transform(rep.montant,'AR')
      }
      this.du += rep.montant;
      this.values.push(dict);
    }
  }
}
