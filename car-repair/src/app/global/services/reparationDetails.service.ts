import { Injectable } from '@angular/core';
import { Reparation } from '../models/reparation.model';
import { ReparationDetails } from '../models/reparationDetails.model';
import { Voiture } from '../models/voiture.model';

@Injectable({
  providedIn: 'root'
})
export class ReparationDetailsService {
    reparations : ReparationDetails[]=[
        {
            id : 1,
            reparationId : 1,
            intitule : 'pneu',
            montant : 50000,
            avancement : 100,
            dateDebut : new Date(),
            dateFin : null
        },{
            id : 2,
            reparationId : 1,
            intitule : 'courroie',
            montant : 75000,
            avancement : 50,
            dateDebut : new Date(),
            dateFin : null
        },{
            id : 3,
            reparationId : 1,
            intitule : 'bougies',
            montant : 30000,
            avancement : 10,
            dateDebut : new Date(),
            dateFin : null
        },{
            id : 4,
            reparationId : 1,
            intitule : 'suspension',
            montant : 120000,
            avancement : 0,
            dateDebut : new Date(),
            dateFin : null
        }
    ]
    constructor ( ){}
    
    getReparationsByCar(immatriculation : string): ReparationDetails[]{
        return this.reparations;
    }
}