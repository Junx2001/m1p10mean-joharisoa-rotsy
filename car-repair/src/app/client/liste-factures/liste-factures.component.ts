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
  title!: string;
  values! : Dict[];

  constructor(private reparationDetService : ReparationDetailsService,
    private route : ActivatedRoute,
    private voitureService : VoitureService,
    private currency : CurrencyPipe) { }

  ngOnInit(): void {
    const immatriculation = this.route.snapshot.params['immatriculation'];
    this.reparations = this.reparationDetService.getReparationsByCar(immatriculation);
    this.voiture = this.voitureService.getVoitureByImmatriculation(immatriculation);

    this.title = "Facture ";
    this.values = [];
    for (let rep of this.reparations){
      const dict = {
        'intitulé':rep.intitule,
        'montant': this.currency.transform(rep.montant,'AR')
      }
      this.values.push(dict);
    }
  }
}
