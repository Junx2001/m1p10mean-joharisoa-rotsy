import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paiement } from '../models/paiement.model';
import { Reparation } from '../models/reparation.model';
import { User } from '../models/user.model';
import { Voiture } from '../models/voiture.model';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
    paiements : Paiement[] = [];
    private apiUrl = 'http://localhost:3000';

    constructor ( private http : HttpClient){}

    pay(formValue:{reparationId: number, montant: number}):Observable<any>{
        const body = {
            'reparation' : formValue.reparationId,
            'montant' : formValue.montant,
        }
        return this.http.post<User>(`${this.apiUrl}/payments`, body);
    }
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