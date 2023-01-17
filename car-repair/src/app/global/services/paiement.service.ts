import { Injectable } from '@angular/core';
import { Paiement } from '../models/paiement.model';
import { Reparation } from '../models/reparation.model';
import { User } from '../models/user.model';
import { Voiture } from '../models/voiture.model';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
    paiements : Paiement[] = [];
    constructor ( ){}
    addPaiement(formValue:{reparationId: number, montant: number}): void{
        this.paiements.push({
            id : 1,
            montant : formValue.montant,
            reparationId : formValue.reparationId,
            date : new Date()
        })
    }
    getPaiementsByReparation(reparationId: number): Paiement[]{
        return this.paiements.filter(paiement => paiement.reparationId === reparationId);
    }
}