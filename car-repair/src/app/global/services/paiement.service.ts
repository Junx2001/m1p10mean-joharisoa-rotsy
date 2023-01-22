import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

    constructor ( private http : HttpClient){}

    pay(formValue:{reparationId: number, montant: number}):Observable<any>{
        const body = {
            'reparation' : formValue.reparationId,
            'montant' : formValue.montant,
        }
        return this.http.post<any>(`${apiUrl.key}/payments`, body);
    }
    getAllPayements(): Observable<any>{
        return this.http.get<any>(`${apiUrl.key}/payments`);
    }
    getPayementsByReparationId(reparationId: string):Observable<any>{
        return this.getAllPayements().pipe(
            map(value=>value.filter(pay => pay.reparation === reparationId)),
        );
    }
    validatePayement(paymentId: string):Observable<any>{
        return this.http.post<any>(`${apiUrl.key}/payments/validate/${paymentId}`, null);
    }
    addDepense(formValue:{intitule: string, montant: number}){
        const body={
            'intitule':formValue.intitule,
            'montant':formValue.montant
        }
        return this.http.post<any>(`${apiUrl.key}/depenses/add`, body);
    }
}