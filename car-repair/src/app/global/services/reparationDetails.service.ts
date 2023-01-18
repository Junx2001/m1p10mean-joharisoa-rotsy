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
            reparationId : 2,
            intitule : 'bougies',
            montant : 30000,
            avancement : 10,
            dateDebut : new Date(),
            dateFin : null
        },{
            id : 4,
            reparationId : 2,
            intitule : 'suspension',
            montant : 120000,
            avancement : 0,
            dateDebut : new Date(),
            dateFin : null
        },
        {
            id : 5,
            reparationId : 3,
            intitule : 'pneu',
            montant : 50000,
            avancement : 100,
            dateDebut : new Date(),
            dateFin : null
        },{
            id : 6,
            reparationId : 3,
            intitule : 'courroie',
            montant : 75000,
            avancement : 50,
            dateDebut : new Date(),
            dateFin : null
        },{
            id : 7,
            reparationId : 3,
            intitule : 'bougies',
            montant : 30000,
            avancement : 10,
            dateDebut : new Date(),
            dateFin : null
        },{
            id : 8,
            reparationId : 4,
            intitule : 'suspension',
            montant : 120000,
            avancement : 0,
            dateDebut : new Date(),
            dateFin : null
        },
        {
            id : 9,
            reparationId : 5,
            intitule : 'pneu',
            montant : 50000,
            avancement : 100,
            dateDebut : new Date(),
            dateFin : null
        },{
            id : 10,
            reparationId : 5,
            intitule : 'courroie',
            montant : 75000,
            avancement : 50,
            dateDebut : new Date(),
            dateFin : null
        },{
            id : 11,
            reparationId : 5,
            intitule : 'bougies',
            montant : 30000,
            avancement : 10,
            dateDebut : new Date(),
            dateFin : null
        },{
            id : 12,
            reparationId : 1,
            intitule : 'bougies',
            montant : 30000,
            avancement : 10,
            dateDebut : new Date(),
            dateFin : null
        },{
            id : 13,
            reparationId : 1,
            intitule : 'suspension',
            montant : 120000,
            avancement : 0,
            dateDebut : new Date(),
            dateFin : null
        }
    ]
    constructor ( ){}
    
    getReparationsDetByReparation(reparationId : number): ReparationDetails[]{
        return this.reparations.filter(repDet => repDet.reparationId === reparationId);
    }
}