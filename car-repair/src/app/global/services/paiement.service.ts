import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
    private apiUrl = 'http://localhost:3000';

    constructor ( private http : HttpClient){}

    pay(formValue:{reparationId: number, montant: number}):Observable<any>{
        const body = {
            'reparation' : formValue.reparationId,
            'montant' : formValue.montant,
        }
        return this.http.post<any>(`${this.apiUrl}/payments`, body);
    }
    getAllPayements(): Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/payments`);
    }
    getPayementsByReparationId(reparationId: string):Observable<any>{
        return this.getAllPayements().pipe(
            map(value=>value.filter(pay => pay.reparation === reparationId)),
        );
    }
    validatePayement(paymentId: string):Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/payments/validate/${paymentId}`, null);
    }
    addDepense(formValue:{intitule: string, montant: number}){
        const body={
            'intitule':formValue.intitule,
            'montant':formValue.montant
        }
        return this.http.post<any>(`${this.apiUrl}/depenses/add`, body);
    }
}