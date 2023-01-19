import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
        },
        {
            id : 3, 
            voitureId : 2,
            dateDepot : new Date(),
            dateRecup :  new Date('2023-02-16T23:59:59.000Z'),
            responsableAtelierId : 5
        },
        {
            id : 4, 
            voitureId : 2,
            dateDepot : new Date(),
            dateRecup : new Date('2023-02-17T23:59:59.000Z'),
            responsableAtelierId : 5
        },
        {
            id : 5, 
            voitureId : 2,
            dateDepot : new Date(),
            dateRecup : null,
            responsableAtelierId : 5
        }
    ];
    private apiUrl = 'http://localhost:3000';

    constructor ( private http : HttpClient){}

    getCarReparationsByImmatriculation(imm : string):Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/reparations/${imm}`);
    }
    getCarRepairInProcess(imm: string):Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/reparations/actual/${imm}`);

    }

    addVoitureReparation(voiture : Voiture){
        this.reparations.push({
            id : 1,
            voitureId : voiture.id,
            dateDepot : new Date(),
            dateRecup : null,
            responsableAtelierId : null
        })
    }
    getReparationsByVoiture(idVoiture : number): Reparation[]{
        return this.reparations.filter(reparation => reparation.voitureId === idVoiture);
    }
    getReparationsEnCours(client : User): Reparation[]{
        // get reparations en cours du client 
        return this.reparations;
    }
    getReparationsEnCoursByCar(idVoiture : number): Reparation{
        // get reparations en cours de la voiture car du client  
        return this.reparations.find(reparation => reparation.voitureId === idVoiture);
    }
}