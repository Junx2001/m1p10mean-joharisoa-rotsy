import { Injectable } from '@angular/core';
import { Reparation } from '../models/reparation.model';
import { Voiture } from '../models/voiture.model';

@Injectable({
  providedIn: 'root'
})
export class ReparationService {
    reparations : Reparation[];
    constructor ( ){}
    addVoitureReparation(voiture : Voiture){
        this.reparations.push({
            id : 1,
            voitureId : voiture.id,
            dateDepot : new Date(),
            dateRecup : null,
            responsableAtelierId : null
        })
    }
    getVoitureReparation(voiture: Voiture): Reparation{
        return this.reparations.find(reparation => reparation.voitureId === voiture.id);
    }
}