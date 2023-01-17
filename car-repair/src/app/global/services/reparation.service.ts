import { Injectable } from '@angular/core';
import { Reparation } from '../models/reparation.model';
import { User } from '../models/user.model';
import { Voiture } from '../models/voiture.model';

@Injectable({
  providedIn: 'root'
})
export class ReparationService {
    reparations : Reparation[] =
    [
        {
            id : 1, 
            voitureId : 1,
            dateDepot : new Date(),
            dateRecup : null,
            responsableAtelierId : 4
        },
        {
            id : 2, 
            voitureId : 3,
            dateDepot : new Date(),
            dateRecup : null,
            responsableAtelierId : 5
        }
    ];
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
    getReparationsEnCours(client : User): Reparation[]{
        // get reparations en cours du client 
        return this.reparations;
    }
}