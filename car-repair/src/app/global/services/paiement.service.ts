import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}